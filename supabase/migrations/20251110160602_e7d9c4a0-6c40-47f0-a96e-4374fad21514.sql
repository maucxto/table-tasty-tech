-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE app_role AS ENUM ('super_admin', 'restaurant_owner', 'restaurant_admin', 'staff_kitchen', 'staff_bar', 'staff_cashier');
CREATE TYPE subscription_plan AS ENUM ('free', 'basic', 'pro', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'suspended', 'cancelled');
CREATE TYPE table_location AS ENUM ('interior', 'exterior', 'private', 'bar');
CREATE TYPE table_status AS ENUM ('available', 'occupied', 'reserved', 'maintenance');
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'delivered', 'paid', 'cancelled');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'transfer', 'open_tab');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE item_status AS ENUM ('pending', 'preparing', 'ready', 'delivered');
CREATE TYPE station AS ENUM ('kitchen', 'bar');
CREATE TYPE session_status AS ENUM ('active', 'closed', 'abandoned');
CREATE TYPE event_type AS ENUM ('menu_view', 'product_view', 'cart_add', 'order_placed', 'payment_completed');

-- Create restaurants table
CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT,
    subdomain TEXT UNIQUE,
    custom_domain TEXT,
    subscription_plan subscription_plan DEFAULT 'free',
    subscription_status subscription_status DEFAULT 'trial',
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '14 days',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role app_role DEFAULT 'restaurant_owner',
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    station station DEFAULT 'kitchen',
    image_url TEXT,
    available BOOLEAN DEFAULT true,
    prep_time INTEGER DEFAULT 15,
    tags TEXT[] DEFAULT '{}',
    allergens TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables table
CREATE TABLE public.tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    table_number INTEGER NOT NULL,
    qr_code_url TEXT,
    capacity INTEGER DEFAULT 4,
    location table_location DEFAULT 'interior',
    status table_status DEFAULT 'available',
    current_session_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(restaurant_id, table_number)
);

-- Create sessions table
CREATE TABLE public.sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    table_id UUID NOT NULL REFERENCES public.tables(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    total_orders INTEGER DEFAULT 0,
    total_amount DECIMAL(10, 2) DEFAULT 0,
    status session_status DEFAULT 'active'
);

-- Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    table_id UUID NOT NULL REFERENCES public.tables(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
    order_number TEXT NOT NULL,
    subtotal DECIMAL(10, 2) DEFAULT 0,
    tax DECIMAL(10, 2) DEFAULT 0,
    tip DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) DEFAULT 0,
    status order_status DEFAULT 'pending',
    payment_method payment_method,
    payment_status payment_status DEFAULT 'pending',
    customer_name TEXT,
    customer_phone TEXT,
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    product_snapshot JSONB NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    comments TEXT,
    status item_status DEFAULT 'pending',
    station station DEFAULT 'kitchen',
    assigned_to UUID REFERENCES public.profiles(id),
    prepared_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    method payment_method NOT NULL,
    status payment_status DEFAULT 'pending',
    transaction_id TEXT,
    metadata JSONB DEFAULT '{}',
    processed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics_events table
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    event_type event_type NOT NULL,
    event_data JSONB DEFAULT '{}',
    user_agent TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON public.restaurants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        'restaurant_owner',
        NEW.raw_user_meta_data->>'full_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for restaurants
CREATE POLICY "Super admins can view all restaurants" ON public.restaurants FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Users can view their own restaurant" ON public.restaurants FOR SELECT USING (
    id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Super admins can manage all restaurants" ON public.restaurants FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());

-- RLS Policies for products
CREATE POLICY "Users can view their restaurant's products" ON public.products FOR SELECT USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Admins can manage their restaurant's products" ON public.products FOR ALL USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid() AND role IN ('restaurant_owner', 'restaurant_admin'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for categories
CREATE POLICY "Users can view their restaurant's categories" ON public.categories FOR SELECT USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Admins can manage their restaurant's categories" ON public.categories FOR ALL USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid() AND role IN ('restaurant_owner', 'restaurant_admin'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for tables
CREATE POLICY "Users can view their restaurant's tables" ON public.tables FOR SELECT USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Admins can manage their restaurant's tables" ON public.tables FOR ALL USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid() AND role IN ('restaurant_owner', 'restaurant_admin'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for orders (staff can view their station's orders)
CREATE POLICY "Users can view their restaurant's orders" ON public.orders FOR SELECT USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Staff can manage their restaurant's orders" ON public.orders FOR ALL USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for order_items
CREATE POLICY "Users can view their restaurant's order items" ON public.order_items FOR SELECT USING (
    order_id IN (SELECT id FROM public.orders WHERE restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid()))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Staff can manage order items" ON public.order_items FOR ALL USING (
    order_id IN (SELECT id FROM public.orders WHERE restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid()))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for sessions
CREATE POLICY "Users can view their restaurant's sessions" ON public.sessions FOR SELECT USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Staff can manage sessions" ON public.sessions FOR ALL USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for payments
CREATE POLICY "Users can view their restaurant's payments" ON public.payments FOR SELECT USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Cashiers can manage payments" ON public.payments FOR ALL USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid() AND role IN ('restaurant_owner', 'restaurant_admin', 'staff_cashier'))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- RLS Policies for analytics_events
CREATE POLICY "Users can view their restaurant's analytics" ON public.analytics_events FOR SELECT USING (
    restaurant_id IN (SELECT restaurant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "System can insert analytics events" ON public.analytics_events FOR INSERT WITH CHECK (true);