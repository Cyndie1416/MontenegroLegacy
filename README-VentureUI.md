# VentureUI Framework v2.0.0

**Advanced Business-Focused UI Framework**

VentureUI is a next-generation UI framework specifically designed for business and venture management applications. Built on enhanced Bootstrap foundations with modern design principles, professional color schemes, and enterprise-grade components.

## 🚀 Features

### Enhanced Design System
- **Modern Color Palette**: Professional blues, refined purples, and growth-focused colors
- **Advanced Typography**: Inter font stack with comprehensive weight options
- **Enhanced Shadows**: Multiple shadow levels with subtle depth effects
- **Modern Border Radius**: Flexible radius system from subtle to pill shapes

### Advanced Components

#### 🔘 Enhanced Buttons
- **Gradient Buttons**: Beautiful gradient effects with hover animations
- **Glass Morphism**: Modern glass effect buttons with backdrop blur
- **Floating Action Buttons**: Fixed position FABs with hover effects
- **Icon Split Buttons**: Professional icon + text combinations
- **Loading States**: Animated loading indicators

#### 📋 Modern Cards
- **Stats Cards**: Professional business metrics display
- **Gradient Cards**: Eye-catching gradient backgrounds
- **Glass Cards**: Modern glass morphism effects
- **Hover Effects**: Lift and scale animations
- **Collapsible Cards**: Enhanced accordion functionality

#### 🎨 Utility Classes
- **Gradient Backgrounds**: Pre-defined gradient utilities
- **Enhanced Shadows**: Comprehensive shadow system
- **Modern Spacing**: Extended spacing scale
- **Venture Colors**: Business-focused color palette
- **Hover Effects**: Professional interaction states

## 🎯 Color System

### Primary Venture Colors
```scss
$venture-primary: #2563eb    // Professional Blue
$venture-secondary: #7c3aed  // Refined Purple
$venture-accent: #06b6d4     // Modern Cyan
$venture-success: #059669    // Growth Green
$venture-warning: #d97706    // Alert Orange
$venture-danger: #dc2626     // Error Red
```

### Enhanced Gray Scale
```scss
$gray-50: #f9fafb          // Lightest
$gray-100: #f3f4f6
$gray-200: #e5e7eb
$gray-300: #d1d5db
$gray-400: #9ca3af
$gray-500: #6b7280
$gray-600: #4b5563
$gray-700: #374151
$gray-800: #1f2937
$gray-900: #111827         // Darkest
```

## 📦 Installation & Usage

### CSS Framework
```html
<!-- VentureUI Framework -->
<link href="css/ventureui.min.css" rel="stylesheet">

<!-- For legacy compatibility -->
<link href="css/montenegrolegacy-admin.min.css" rel="stylesheet">
```

### JavaScript Dependencies
```html
<!-- Core Dependencies -->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- VentureUI Scripts -->
<script src="js/sb-admin-2.min.js"></script>
```

## 🧩 Component Examples

### Gradient Button
```html
<button class="btn btn-gradient">Gradient Action</button>
<button class="btn btn-gradient btn-gradient-success">Success Action</button>
```

### Glass Card
```html
<div class="card card-glass">
  <div class="card-header">
    <h5>Glass Card Title</h5>
  </div>
  <div class="card-body">
    Modern glass morphism effect
  </div>
</div>
```

### Stats Card
```html
<div class="card card-stats">
  <div class="card-body">
    <div class="stats-icon">
      <i class="fas fa-chart-line"></i>
    </div>
    <div class="stats-number">$42,580</div>
    <div class="stats-label">Monthly Revenue</div>
    <div class="stats-change positive">
      <i class="fas fa-arrow-up"></i> +12.5%
    </div>
  </div>
</div>
```

### Floating Action Button
```html
<button class="btn btn-fab btn-primary">
  <i class="fas fa-plus"></i>
</button>
```

## 🎨 Utility Classes

### Gradient Backgrounds
```html
<div class="bg-gradient-primary">Primary Gradient</div>
<div class="bg-gradient-success">Success Gradient</div>
```

### Enhanced Shadows
```html
<div class="shadow-sm">Small Shadow</div>
<div class="shadow-md">Medium Shadow</div>
<div class="shadow-lg">Large Shadow</div>
<div class="shadow-xl">Extra Large Shadow</div>
<div class="shadow-2xl">2X Large Shadow</div>
<div class="shadow-colored">Colored Shadow</div>
```

### Hover Effects
```html
<div class="hover-lift">Lift on Hover</div>
<div class="hover-scale">Scale on Hover</div>
<div class="hover-glow">Glow on Hover</div>
```

### Glass Morphism
```html
<div class="glass">Glass Effect</div>
<div class="glass-dark">Dark Glass Effect</div>
```

## 🛠 Build Process

The framework is built using Gulp with SCSS compilation:

```bash
# Build VentureUI Framework
gulp css

# Build legacy compatibility
gulp cssLegacy

# Build everything
gulp build

# Development server with live reload
gulp watch
```

## 📁 File Structure

```
scss/
├── ventureui.scss                 # Main framework file
├── _variables.scss                # Enhanced variables
├── _buttons.scss                  # Enhanced button components
├── _cards.scss                    # Modern card components
├── utilities/
│   └── _ventureui-utilities.scss  # Custom utility classes
└── [other component files]

css/
├── ventureui.css                  # Compiled framework
├── ventureui.min.css             # Minified framework
├── montenegrolegacy-admin.css        # Legacy compatibility
└── montenegrolegacy-admin.min.css    # Legacy minified
```

## 🎯 Business Focus

VentureUI is specifically designed for:
- **Business Cores**: Professional metrics and KPI displays
- **Venture Management**: Multi-business operation interfaces
- **Financial Applications**: Clean, trustworthy financial UIs
- **Admin Panels**: Modern, efficient administrative interfaces
- **Analytics Platforms**: Data-rich visualization interfaces

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

VentureUI is built for the business community. Contributions welcome for:
- New business-focused components
- Enhanced accessibility features
- Performance optimizations
- Documentation improvements

---

**VentureUI Framework v2.0.0**  
*Professional UI Framework for Modern Business Applications*

Built with ❤️ by MontenegroLegacy Team
