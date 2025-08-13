# Islamic App - Modern PWA Mobile Web Application

A beautiful, modern Progressive Web App (PWA) designed for Islamic daily activities with a green and yellow color scheme.

## 🌟 Features

### Design & UI
- **Modern Islamic Design**: Clean, elegant interface with Islamic aesthetics
- **Green & Yellow Color Scheme**: Primary green (#4CAF50) with yellow accents (#FFD700)
- **Responsive Design**: Optimized for mobile devices with touch-friendly interface
- **PWA Features**: Installable, offline-capable, and app-like experience
- **Footer Navigation**: Fixed bottom menu with 5 main sections

### Core Functionality
- **Prayer Times**: Display current prayer time with beautiful cards
- **Quick Actions**: Easy access to Quran, Prayer Times, Qibla, and Islamic Calendar
- **Daily Reminders**: Interactive reminders for Dhikr, Charity, and Quran reading
- **Islamic News**: Latest Islamic news and events
- **Notifications**: Push notifications for prayer reminders

### Technical Features
- **Progressive Web App**: Full PWA capabilities with service worker
- **Offline Support**: Works without internet connection
- **Touch Feedback**: Responsive touch interactions
- **Smooth Animations**: Modern CSS animations and transitions
- **Cross-browser Compatible**: Works on all modern browsers

## 📱 Sections

### Header
- Mosque logo with app name
- Notification and search buttons
- Sticky positioning for easy access

### Hero Section
- "Assalamu Alaikum" greeting
- Current prayer time display
- Beautiful gradient background

### Quick Actions Grid
- **Quran**: Access to Holy Quran
- **Prayer Times**: Daily prayer schedule
- **Qibla**: Direction finder
- **Islamic Calendar**: Hijri calendar

### Daily Reminders
- **Dhikr Reminder**: Remember Allah daily
- **Charity**: Give in charity today
- **Read Quran**: Daily Quran reading goal

### Islamic News
- Latest Islamic news and events
- Time-stamped articles
- Interactive news cards

### Footer Menu
- **Home**: Main dashboard
- **Prayer**: Prayer section
- **Quran**: Quran section
- **Calendar**: Islamic calendar
- **Profile**: User profile

## 🎨 Color Palette

```css
--primary-green: #4CAF50
--secondary-green: #45a049
--accent-yellow: #FFD700
--light-yellow: #FFF9C4
--dark-green: #2E7D32
--light-green: #E8F5E8
```

## 🚀 Installation & Usage

### Quick Start
1. Clone or download the project files
2. Open `index.html` in a web browser
3. For PWA installation, use a modern browser (Chrome, Edge, Safari)

### Local Development
```bash
# Using Python (if available)
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Using PHP (if available)
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### PWA Installation
1. Open the app in Chrome/Edge
2. Look for the install icon in the address bar
3. Click "Install" to add to home screen
4. The app will work offline after installation

## 📁 File Structure

```
mobile2/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── app.js             # JavaScript functionality
├── manifest.json      # PWA manifest
├── sw.js             # Service worker
└── README.md         # This file
```

## 🔧 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #4CAF50;
    --accent-yellow: #FFD700;
    /* ... other colors */
}
```

### Content
- Update prayer times in `app.js`
- Modify reminders in `index.html`
- Change news items in the HTML structure

### Features
- Add new sections by extending the HTML
- Implement real prayer time API integration
- Add Quran text and audio functionality
- Integrate with Islamic calendar APIs

## 🌐 Browser Support

- ✅ Chrome 67+
- ✅ Firefox 67+
- ✅ Safari 11.1+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 PWA Features

### Installable
- Add to home screen
- App-like experience
- Standalone mode

### Offline Capable
- Service worker caching
- Offline functionality
- Background sync

### Push Notifications
- Prayer time reminders
- Daily notifications
- Interactive notifications

## 🎯 Future Enhancements

- [ ] Real prayer time API integration
- [ ] Quran text and audio
- [ ] Qibla compass functionality
- [ ] Islamic calendar with events
- [ ] User profiles and settings
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Prayer tracking
- [ ] Community features

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving the design
- Adding new functionality

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Islamic design inspiration
- PWA best practices

---

**Made with ❤️ for the Islamic community** 