import { pgTable, serial, text, numeric, boolean, timestamp, integer, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// --- Products Table ---
// Base metadata: Name, Description, Base Price
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// --- Options Table ---
// Definitions: "Color", "Size", "Material"
export const options = pgTable("options", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(), // e.g. "Color"
});

// --- Option Values Table ---
// Values: "Red", "XL", "Cotton"
export const optionValues = pgTable("option_values", {
    id: serial("id").primaryKey(),
    optionId: integer("option_id").references(() => options.id).notNull(),
    value: text("value").notNull(), // e.g. "Red"
});

// --- Product Variants Table ---
// SKU specific: Stock, Price Override
export const productVariants = pgTable("product_variants", {
    id: serial("id").primaryKey(),
    productId: integer("product_id").references(() => products.id).notNull(),
    sku: text("sku").unique().notNull(),
    stock: integer("stock").default(0).notNull(),
    priceOverride: numeric("price_override", { precision: 10, scale: 2 }), // Optional override
    isActive: boolean("is_active").default(true),
});

// --- Variant Option Values Junction Table ---
// Linking Variants to Values (e.g., This specific variant is "Red" and "XL")
export const variantOptionValues = pgTable("variant_option_values", {
    id: serial("id").primaryKey(),
    variantId: integer("variant_id").references(() => productVariants.id).notNull(),
    optionValueId: integer("option_value_id").references(() => optionValues.id).notNull(),
});

// --- Relations ---

export const productsRelations = relations(products, ({ many }) => ({
    variants: many(productVariants),
}));

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
    product: one(products, {
        fields: [productVariants.productId],
        references: [products.id],
    }),
    optionValues: many(variantOptionValues),
}));

export const optionsRelations = relations(options, ({ many }) => ({
    values: many(optionValues),
}));

export const optionValuesRelations = relations(optionValues, ({ one }) => ({
    option: one(options, {
        fields: [optionValues.optionId],
        references: [options.id],
    }),
}));

export const variantOptionValuesRelations = relations(variantOptionValues, ({ one }) => ({
    variant: one(productVariants, {
        fields: [variantOptionValues.variantId],
        references: [productVariants.id],
    }),
    optionValue: one(optionValues, {
        fields: [variantOptionValues.optionValueId],
        references: [optionValues.id],
    }),
}));

// --- AUTHENTICATION (Better Auth) ---

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull().references(() => user.id),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId").notNull().references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
});

// --- SHOPPING CART ---

export const carts = pgTable("carts", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => user.id),
    guestId: text("guest_id"), // For unauthenticated users
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
    id: serial("id").primaryKey(),
    cartId: integer("cart_id").references(() => carts.id).notNull(),
    productVariantId: integer("product_variant_id").references(() => productVariants.id).notNull(),
    quantity: integer("quantity").default(1).notNull(),
});

// --- Relations Updates ---

export const cartsRelations = relations(carts, ({ many, one }) => ({
    items: many(cartItems),
    user: one(user, {
        fields: [carts.userId],
        references: [user.id],
    }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    cart: one(carts, {
        fields: [cartItems.cartId],
        references: [carts.id],
    }),
    variant: one(productVariants, {
        fields: [cartItems.productVariantId],
        references: [productVariants.id],
    }),
}));

// --- ORDERS ---

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => user.id),
    guestId: text("guest_id"),
    email: text("email").notNull(),
    status: text("status").default("pending").notNull(),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    shippingDetails: json("shipping_details"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => orders.id).notNull(),
    productVariantId: integer("product_variant_id").references(() => productVariants.id).notNull(),
    quantity: integer("quantity").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});

export const ordersRelations = relations(orders, ({ many, one }) => ({
    items: many(orderItems),
    user: one(user, {
        fields: [orders.userId],
        references: [user.id],
    }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    variant: one(productVariants, {
        fields: [orderItems.productVariantId],
        references: [productVariants.id],
    }),
}));

