# 🎓 CGPA Calculator

A sleek, dynamic CGPA Calculator built using HTML, CSS, and JavaScript. This tool allows students to input their subject marks and credits manually or search from a preloaded subject list using an Excel sheet.

---

## Live Demo

> [Click here to view the live site](https://ritesh-45.github.io/Calc/)
---

## 🚀 Features

- 🎯 Real-time CGPA Calculation
- ➕ Dynamically add subjects
- 🔍 Search subjects from an Excel database
- 📄 Uses `xlsx` library to read `.xlsx` files
- 🧮 GPA logic based on percentage → grade conversion
- 💡 Clean, modern UI using Orbitron and Digital fonts

---

## 🛠️ Tech Stack

- HTML5  
- CSS3 (Responsive + Neumorphism style)  
- JavaScript  
- [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) for Excel parsing  

---

## 📁 Project Structure

📦 CGPA-Calculator/
├── index.html # Main web structure
├── styles.css # All styling and responsiveness
├── script.js # Logic for CGPA calculation and subject search
├── subjects.xlsx # (Place this Excel file in root for search feature)
├── font/ # Digital-7 font files
└── README.md # Project documentation


---

## ✅ How to Use

1. Clone or download this repository.
2. Make sure `subjects.xlsx` is in the root directory.
3. Open `index.html` in any browser.
4. Start entering marks and credits, or search for subjects using the search bar.
5. Click `Calc =` to see your CGPA instantly!

---

## 📐 GPA Conversion Logic

| Marks Range | GPA |
|-------------|-----|
| 90–100      | 10  |
| 80–89       | 9   |
| 70–79       | 8   |
| 60–69       | 7   |
| 50–59       | 6   |
| 40–49       | 5   |
| Below 40    | 0   |

---

## 🙋‍♂️ Author

**Ritesh Tikader**  
_Sathyabama Institute of Science and Technology_  
Department of CSE - AI & Robotics 🧠🤖  
> “Code with purpose. Build for impact.”  

---

## 🌟 Credits

- Inspired by student needs for semester GPA tracking
- Font: [Digital-7](https://www.dafont.com/digital-7.font)
- Excel parsing: [SheetJS](https://sheetjs.com/)

---

## 📌 Notes

- This app runs completely on the browser – no backend required!
- Make sure to serve with a local server (e.g., VS Code Live Server) if `subjects.xlsx` doesn't load directly.

---

## 📷 Screenshots

![Screenshot 2025-05-28 005754](https://github.com/user-attachments/assets/ba2120b2-e958-4d12-bd55-d0319005c888)



---

## 📄 License

This project is open-source and free to use under the **MIT License**.
