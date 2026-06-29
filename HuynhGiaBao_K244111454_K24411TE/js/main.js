/**
 * eHaHa E-Commerce Website - JavaScript Logic (Code: BW07)
 * Student: HUỲNH GIA BẢO
 * Student ID: K244111454
 * Class: K24411TE
 */

// GLOBAL DATABASE & STATE MANAGERS
let productsData = [];
let categoriesData = [];
let customersData = [];
let employeesData = [];
let ordersData = [];
let orderDetailsData = [];

// Gold Price API state managers
let loadedGoldData = null;
let isGoldFallback = false;
let activeGoldBrand = "sjc";

// Fallback Mock Databases (used in case remote fetch fails)
const FALLBACK_CATEGORIES = [
    { categoryId: "CAT001", categoryName: "Phones & Tablets" },
    { categoryId: "CAT002", categoryName: "Computers & Laptops" },
    { categoryId: "CAT003", categoryName: "Tech Accessories" },
    { categoryId: "CAT004", categoryName: "Audio Equipment" },
    { categoryId: "CAT005", categoryName: "Smart Home" }
];

const FALLBACK_PRODUCTS = [
    { productId: "PROD001", productName: "iPhone 15 Pro Max 256GB", categoryId: "CAT001", price: 29500000, imageUrl: "https://tranduythanh.com/pictures/h1.png", description: "Flagship iPhone with titanium design and A17 Pro chip." },
    { productId: "PROD002", productName: "MacBook Pro M3 14-inch", categoryId: "CAT002", price: 39990000, imageUrl: "https://tranduythanh.com/pictures/h2.png", description: "Powerful Apple laptop for creators and professionals." },
    { productId: "PROD003", productName: "AirPods Pro Gen 2 Headphones", categoryId: "CAT003", price: 5800000, imageUrl: "https://tranduythanh.com/pictures/h3.png", description: "Advanced active noise cancellation and premium sound." },
    { productId: "PROD004", productName: "iPad Air 6 M2 Wifi 128GB", categoryId: "CAT001", price: 16200000, imageUrl: "https://tranduythanh.com/pictures/h4.png", description: "Sleek iPad with powerful M2 chip and Liquid Retina display." },
    { productId: "PROD005", productName: "ASUS ROG Strix G16 Laptop", categoryId: "CAT002", price: 34500000, imageUrl: "https://tranduythanh.com/pictures/h5.png", description: "High-performance gaming laptop with ROG cooling." },
    { productId: "PROD006", productName: "Logitech MX Master 3S Mouse", categoryId: "CAT003", price: 2450000, imageUrl: "https://tranduythanh.com/pictures/h6.png", description: "Ergonomic wireless mouse designed for productivity." },
    { productId: "PROD007", productName: "JBL Charge 5 Speaker", categoryId: "CAT004", price: 3950000, imageUrl: "https://tranduythanh.com/pictures/h7.png", description: "Portable waterproof bluetooth speaker with deep bass." },
    { productId: "PROD008", productName: "Sony WH-1000XM5 Headphones", categoryId: "CAT004", price: 6990000, imageUrl: "https://tranduythanh.com/pictures/h8.png", description: "Industry-leading noise cancelling wireless headphones." },
    { productId: "PROD009", productName: "Ecovacs Deebot T20 Robot", categoryId: "CAT005", price: 13900000, imageUrl: "https://tranduythanh.com/pictures/h9.png", description: "Smart robotic vacuum and mop with auto empty station." },
    { productId: "PROD010", productName: "Anker GaN 65W Fast Charger", categoryId: "CAT003", price: 650000, imageUrl: "https://tranduythanh.com/pictures/h10.png", description: "Compact multi-port fast charging wall adapter." }
];

const FALLBACK_CUSTOMERS = [
    { customerId: "CUST001", fullName: "John Smith", email: "john.smith@example.com", phone: "07911 123456", password: "123" },
    { customerId: "CUST002", fullName: "Emily Johnson", email: "emily.j.work@example.com", phone: "07911 654321", password: "123" }
];

const FALLBACK_EMPLOYEES = [
    { employeeId: "EMP001", fullName: "James Anderson", position: "Sales Executive", department: "Sales Team A", email: "janderson@company.com", password: "123" },
    { employeeId: "EMP002", fullName: "Jessica Miller", position: "Sales Manager", department: "Sales Management", email: "jmiller@company.com", password: "123" },
    { employeeId: "EMP003", fullName: "William Thomas", position: "Sales Executive", department: "Sales Team B", email: "wthomas@company.com", password: "123" }
];

const FALLBACK_ORDERS = [
    { orderId: "ORD1001", customerId: "CUST001", employeeId: "EMP001", totalAmount: 35950000 },
    { orderId: "ORD1002", customerId: "CUST002", employeeId: "EMP001", totalAmount: 39990000 },
    { orderId: "ORD1003", customerId: "CUST003", employeeId: "EMP003", totalAmount: 19300000 },
    { orderId: "ORD1004", customerId: "CUST004", employeeId: "EMP003", totalAmount: 44440000 },
    { orderId: "ORD1005", customerId: "CUST001", employeeId: "EMP001", totalAmount: 3100000 }
];

const FALLBACK_ORDER_DETAILS = [
    { orderDetailId: "OD1001_1", orderId: "ORD1001", productId: "PROD001", quantity: 1, unitPrice: 29500000 },
    { orderDetailId: "OD1001_2", orderId: "ORD1001", productId: "PROD003", quantity: 1, unitPrice: 5800000 },
    { orderDetailId: "OD1002_1", orderId: "ORD1002", productId: "PROD002", quantity: 1, unitPrice: 39990000 },
    { orderDetailId: "OD1003_1", orderId: "ORD1003", productId: "PROD004", quantity: 1, unitPrice: 16200000 },
    { orderDetailId: "OD1005_1", orderId: "ORD1005", productId: "PROD006", quantity: 1, unitPrice: 2450000 }
];

// DETAILED MOCK GOLD DATA
const DETAILED_MOCK_GOLD = {
    sjc: [
        { type: "SJC 1L, 10L, 1KG", buyPrice: 145000000, sellPrice: 148000000 },
        { type: "SJC 5 chỉ", buyPrice: 145000000, sellPrice: 148020000 },
        { type: "SJC 0.5 chỉ, 1 chỉ, 2 chỉ", buyPrice: 145000000, sellPrice: 148030000 }
    ],
    doji: [
        { type: "NHẪN TRÒN 9999 HƯNG THỊNH VƯỢNG", buyPrice: 145000000, sellPrice: 148000000 },
        { type: "SJC - Bán Lẻ", buyPrice: 145000000, sellPrice: 148000000 },
        { type: "Kim TT/AVPL", buyPrice: 145000000, sellPrice: 148000000 }
    ],
    pnj: [
        { type: "SJC PNJ", buyPrice: 145000000, sellPrice: 148000000 },
        { type: "PNJ Gold", buyPrice: 145000000, sellPrice: 148000000 },
        { type: "Nhẫn Tròn PNJ 999.9", buyPrice: 145000000, sellPrice: 148000000 }
    ],
    btmc: [
        { type: "VÀNG MIẾNG SJC", buyPrice: 144000000, sellPrice: 148000000 },
        { type: "NHẪN TRÒN TRƠN BẢO TÍN MINH CHÂU", buyPrice: 144000000, sellPrice: 147500000 },
        { type: "QUÀ MỪNG BẢN VỊ VÀNG BẢO TÍN MINH CHÂU", buyPrice: 144000000, sellPrice: 147500000 }
    ]
};

// APP INITIALIZATION
window.addEventListener("DOMContentLoaded", () => {
    init();
});

function init() {
    // 1. Initialize the digital marquee clock
    updateClock();
    setInterval(updateClock, 1000);

    // 2. Add SPA router event handlers to the dropdown menus
    setupNavigation();

    // 3. Load database from local/remote JSON
    loadDatabase();

    // 4. Render the default screen (About Me)
    showAboutMe();
}

// -------------------------------------------------------------
// TIMER & FOOTER CLOCK (PART C)
// -------------------------------------------------------------
function updateClock() {
    const clockText = document.getElementById("clock-text");
    if (clockText) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeStr = now.toLocaleDateString("en-US", options);
        clockText.textContent = `📅 Current Time: ${timeStr}`;
    }
}

// -------------------------------------------------------------
// SPA ROUTER & NAVIGATION (PART A)
// -------------------------------------------------------------
function setupNavigation() {
    // Top-level direct links or sub-items click event registration
    const routeElements = [
        { id: "nav-about", view: showAboutMe },
        { id: "sub-gold", view: showGoldPrice },
        { id: "sub-education", view: showEducation },
        { id: "sub-parser", view: showUELParser },
        { id: "sub-products", view: showProducts },
        { id: "sub-cart", view: showCart },
        { id: "sub-login", view: showLogin },
        { id: "sub-info", view: showMyInfo },
        { id: "sub-admin", view: showAdministrator }
    ];

    routeElements.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                // Set active class on the parent nav-item
                document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));

                // Active top-level nav-item
                const parentNav = el.closest(".nav-item");
                if (parentNav) parentNav.classList.add("active");

                // Execute screen rendering function
                item.view();
            });
        }
    });

    // Special trigger for direct click on "An Icon" top level item to act as toggler or render Q11
    const iconNav = document.getElementById("nav-icon-link");
    if (iconNav) {
        iconNav.addEventListener("click", (e) => {
            e.preventDefault();
            showIconScreen();
        });
    }
}

// -------------------------------------------------------------
// TOAST NOTIFICATIONS UTILITY
// -------------------------------------------------------------
function showToast(message) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.className = "toast-msg";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// -------------------------------------------------------------
// DATABASE FETCH & LOAD
// -------------------------------------------------------------
function loadDatabase() {
    const dataUrl = "data/ecommerce-sample2.json";
    const remoteUrl = "https://tranduythanh.com/webmaterials/ecommerce-sample2.json";

    // Attempt to fetch from local/remote JSON
    fetch(remoteUrl)
        .then(res => res.json())
        .then(data => storeData(data))
        .catch(err => {
            console.warn("Failed to fetch products remote API, trying local JSON file...", err);
            return fetch(dataUrl)
                .then(res => res.json())
                .then(data => storeData(data))
                .catch(localErr => {
                    console.error("Failed to load local JSON database. Initializing fallbacks.", localErr);
                    storeFallbackData();
                });
        });
}

function storeData(data) {
    categoriesData = data.categories || FALLBACK_CATEGORIES;
    productsData = data.products || FALLBACK_PRODUCTS;
    customersData = data.customers || FALLBACK_CUSTOMERS;
    employeesData = data.employees || FALLBACK_EMPLOYEES;
    ordersData = data.orders || FALLBACK_ORDERS;
    orderDetailsData = data.orderDetails || FALLBACK_ORDER_DETAILS;
    console.log("Database initialized successfully from JSON sources.");
}

function storeFallbackData() {
    categoriesData = FALLBACK_CATEGORIES;
    productsData = FALLBACK_PRODUCTS;
    customersData = FALLBACK_CUSTOMERS;
    employeesData = FALLBACK_EMPLOYEES;
    ordersData = FALLBACK_ORDERS;
    orderDetailsData = FALLBACK_ORDER_DETAILS;
}

// -------------------------------------------------------------
// Q2 - ABOUT ME SCREEN (DEFAULT SCREEN)
// -------------------------------------------------------------
function showAboutMe() {
    const container = document.getElementById("part-b-container");
    container.innerHTML = `
        <h2 class="screen-title">About Me</h2>
        <div class="about-me-card">
            <div class="about-me-avatar">
                <img src="images/anh.png" alt="Huynh Gia Bao Avatar" onerror="this.src='https://placehold.co/150x150/6366f1/ffffff?text=Avatar'">
            </div>
            <div class="about-me-info">
                <div class="info-item">
                    <span class="info-label">Student ID:</span>
                    <span class="info-value">K244111454</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Full Name:</span>
                    <span class="info-value">HUỲNH GIA BẢO</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Class Name:</span>
                    <span class="info-value">K24411TE</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Course:</span>
                    <span class="info-value">Business Web Development</span>
                </div>
                <div class="info-item">
                    <span class="info-label">University:</span>
                    <span class="info-value">University of Economics and Law (UEL)</span>
                </div>
            </div>
        </div>
    `;
}

// -------------------------------------------------------------
// Q3 - GOLD PRICE API SCREEN
// -------------------------------------------------------------
function showGoldPrice() {
    const container = document.getElementById("part-b-container");
    container.innerHTML = `
        <h2 class="screen-title">
            <span>Gold Price API Status</span>
            <button id="btn-fetch-gold" class="btn btn-primary btn-sm">Refresh Prices</button>
        </h2>
        <div id="gold-alert-container"></div>
        
        <div class="gold-layout">
            <div class="gold-sidebar">
                <button class="gold-tab-btn active" id="tab-gold-sjc" data-brand="sjc">GIÁ VÀNG SJC</button>
                <button class="gold-tab-btn" id="tab-gold-doji" data-brand="doji">GIÁ VÀNG DOJI</button>
                <button class="gold-tab-btn" id="tab-gold-pnj" data-brand="pnj">GIÁ VÀNG PNJ</button>
                <button class="gold-tab-btn" id="tab-gold-btmc" data-brand="btmc">GIÁ VÀNG BẢO TÍN MINH CHÂU</button>
            </div>
            <div class="gold-content">
                <h3 id="gold-brand-title" class="gold-title-banner">SJC GOLD PRICE</h3>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Gold Type</th>
                                <th>Buy Price (VND)</th>
                                <th>Sell Price (VND)</th>
                            </tr>
                        </thead>
                        <tbody id="gold-price-table-body">
                            <tr>
                                <td colspan="3" style="text-align: center; color: var(--text-muted);">Fetching gold price data...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Bind tab clicks
    const tabs = ["sjc", "doji", "pnj", "btmc"];
    tabs.forEach(brand => {
        const btn = document.getElementById(`tab-gold-${brand}`);
        if (btn) {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".gold-tab-btn").forEach(t => t.classList.remove("active"));
                btn.classList.add("active");
                activeGoldBrand = brand;
                renderActiveGoldBrand();
            });
        }
    });

    document.getElementById("btn-fetch-gold").addEventListener("click", () => fetchGoldData());

    // Set active brand to default SJC
    activeGoldBrand = "sjc";
    fetchGoldData();
}

function fetchGoldData() {
    const alertContainer = document.getElementById("gold-alert-container");
    const liveNextGoldUrl = "https://baomoi.com/_next/data/rpy23PxSHX_Lxr_qBfoLj/utilities/gold.json";
    const localGoldUrl = "data/gold.json";

    if (alertContainer) alertContainer.innerHTML = "";

    const tbody = document.getElementById("gold-price-table-body");
    if (tbody) {
        tbody.innerHTML = `
            <tr><td colspan="3" style="text-align: center; color: var(--text-muted);">Fetching live gold price data...</td></tr>
        `;
    }

    // Try fetching from the live NextJS JSON endpoint first
    fetch(liveNextGoldUrl)
        .then(res => {
            if (!res.ok) throw new Error("HTTP connection error");
            return res.json();
        })
        .then(data => {
            loadedGoldData = data;
            isGoldFallback = false;
            renderActiveGoldBrand();
        })
        .catch(err => {
            console.warn("Gold Price live fetch failed (CORS restriction), loading local copy from baomoi...", err);

            // Fails over to our downloaded local copy of baomoi.com gold.json
            fetch(localGoldUrl)
                .then(res => {
                    if (!res.ok) throw new Error("Local copy missing");
                    return res.json();
                })
                .then(data => {
                    loadedGoldData = data;
                    isGoldFallback = false;
                    renderActiveGoldBrand();
                })
                .catch(localErr => {
                    console.error("Local Gold Price copy load failed:", localErr);
                    if (alertContainer) {
                        alertContainer.innerHTML = `
                            <div class="alert-box alert-error">
                                ⚠️ Cannot load Gold Price API because of CORS or network restriction. Local source missing.
                            </div>
                        `;
                    }
                });
        });
}

function renderActiveGoldBrand() {
    const tbody = document.getElementById("gold-price-table-body");
    const headerTitle = document.getElementById("gold-brand-title");

    if (!tbody || !headerTitle) return;

    tbody.innerHTML = "";
    const brandLabels = {
        sjc: "GIÁ VÀNG SJC",
        doji: "GIÁ VÀNG DOJI",
        pnj: "GIÁ VÀNG PNJ",
        btmc: "GIÁ VÀNG BẢO TÍN MINH CHÂU"
    };

    if (!loadedGoldData) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No gold prices loaded.</td></tr>`;
        return;
    }

    try {
        // Resolve boards array from NextJS JSON schema
        const boards = loadedGoldData.pageProps.resp.data.content.boards;
        const activeBoard = boards.find(b => b.shortName === activeGoldBrand);

        if (activeBoard && activeBoard.entries) {
            const updateDate = activeBoard.lastUpdateTime || "Just now";
            headerTitle.textContent = `${brandLabels[activeGoldBrand]} - CẬP NHẬT: ${updateDate}`;

            activeBoard.entries.forEach(entry => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>${entry.name}</strong></td>
                    <td style="color: var(--danger-color); font-weight: 700;">${formatCurrency(entry.buy)}</td>
                    <td style="color: var(--accent-color); font-weight: 700;">${formatCurrency(entry.sell)}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--danger-color);">Cannot find active board entries for ${activeGoldBrand}.</td></tr>`;
        }
    } catch (err) {
        console.error("Error parsing NextJS gold JSON structure:", err);
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--danger-color);">Error parsing gold price feed schema.</td></tr>`;
    }
}

// -------------------------------------------------------------
// Q4 - E-COMMERCE EDUCATION SCREEN
// -------------------------------------------------------------
let cachedEducationHTML = "";

function showEducation() {
    const container = document.getElementById("part-b-container");
    container.innerHTML = `
        <h2 class="screen-title">E-Commerce Education</h2>
        <div id="education-alert-container"></div>
        <div class="form-group" style="max-width: 350px;">
            <label for="education-semester-select">Choose Semester:</label>
            <select id="education-semester-select" class="form-control" disabled>
                <option value="">Loading semesters...</option>
            </select>
        </div>
        <div class="table-responsive">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Semester</th>
                        <th>Credits</th>
                    </tr>
                </thead>
                <tbody id="education-table-body">
                    <tr>
                        <td colspan="5" style="text-align: center; color: var(--text-muted);">Please select a semester above to display its course details.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    fetchEducationSyllabus();
}

function fetchEducationSyllabus() {
    const alertContainer = document.getElementById("education-alert-container");
    const semesterSelect = document.getElementById("education-semester-select");
    const uelSyllabusUrl = "https://link.uel.edu.vn/GU9Exz";
    const localSyllabusUrl = "data/education.html";

    // Use cached HTML if already fetched in this session
    if (cachedEducationHTML) {
        parseAndFillSemesters(cachedEducationHTML);
        return;
    }

    // Try live fetch, if CORS fails fall back transparently to local copy
    fetch(uelSyllabusUrl)
        .then(res => {
            if (!res.ok) throw new Error("Network issue");
            return res.text();
        })
        .then(htmlText => {
            cachedEducationHTML = htmlText;
            parseAndFillSemesters(htmlText);
        })
        .catch(err => {
            console.warn("External Education syllabus fetch blocked by CORS, loading fallback copy...", err);
            fetch(localSyllabusUrl)
                .then(res => {
                    if (!res.ok) throw new Error("Local fallback file missing");
                    return res.text();
                })
                .then(htmlText => {
                    cachedEducationHTML = htmlText;
                    parseAndFillSemesters(htmlText);
                })
                .catch(localErr => {
                    console.error("Education fallback failed:", localErr);
                    alertContainer.innerHTML = `
                        <div class="alert-box alert-error">
                            ⚠️ Failed to retrieve academic syllabus from both live link and local cache.
                        </div>
                    `;
                });
        });
}

function parseAndFillSemesters(htmlText) {
    const select = document.getElementById("education-semester-select");
    if (!select) return;

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // Select all spans with id ending with "lblGraduateStudyType" (Syllabus Semester Titles)
        const semesterSpans = doc.querySelectorAll('span[id$="lblGraduateStudyType"]');

        if (semesterSpans.length === 0) {
            throw new Error("No semester nodes found");
        }

        select.innerHTML = '<option value="">-- Select Semester --</option>';
        semesterSpans.forEach(span => {
            const semesterTitle = span.textContent.trim();
            const option = document.createElement("option");
            option.value = span.id; // Store ID to easily find the table matching it later
            option.textContent = semesterTitle;
            select.appendChild(option);
        });

        select.disabled = false;
        select.addEventListener("change", (e) => {
            const selectedSpanId = e.target.value;
            if (selectedSpanId) {
                renderSemesterSubjects(doc, selectedSpanId);
            } else {
                document.getElementById("education-table-body").innerHTML = `
                    <tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Please select a semester above to display its course details.</td></tr>
                `;
            }
        });

    } catch (err) {
        console.error("Error parsing syllabus HTML content:", err);
        const alertContainer = document.getElementById("education-alert-container");
        if (alertContainer) {
            alertContainer.innerHTML = `
                <div class="alert-box alert-error">
                    ⚠️ Error parsing syllabus format. Data template could not be loaded.
                </div>
            `;
        }
    }
}

function renderSemesterSubjects(doc, spanId) {
    const tbody = document.getElementById("education-table-body");
    tbody.innerHTML = "";

    // The semester title span
    const titleSpan = doc.getElementById(spanId);
    const semesterTitle = titleSpan ? titleSpan.textContent.trim() : "Unknown Semester";

    // Table id maps from 'lblGraduateStudyType' to 'grvHocphan'
    const tableId = spanId.replace("lblGraduateStudyType", "grvHocphan");
    const table = doc.getElementById(tableId);

    if (!table) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--danger-color);">No courses listed for this semester.</td></tr>`;
        return;
    }

    const rows = table.querySelectorAll("tr");
    let subjectCount = 0;

    // Skip the first row (the table header)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll("td");
        if (cells.length >= 4) {
            subjectCount++;
            const no = cells[0].textContent.trim();
            const code = cells[1].textContent.trim();
            const name = cells[2].textContent.trim();
            const credits = cells[3].textContent.trim();

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${no}</td>
                <td><code>${code}</code></td>
                <td><strong>${name}</strong></td>
                <td><span class="alert-box alert-info" style="padding: 2px 8px; font-size: 0.75rem; margin-bottom:0;">${semesterTitle}</span></td>
                <td>${credits}</td>
            `;
            tbody.appendChild(tr);
        }
    }

    if (subjectCount === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">No subject entries found in this block.</td></tr>`;
    }
}

// -------------------------------------------------------------
// Q5 & Q6 - PRODUCTS & PRODUCT SEARCH
// -------------------------------------------------------------
function showProducts() {
    const container = document.getElementById("part-b-container");

    // Header title
    const screenTitle = "Products";

    container.innerHTML = `
        <h2 class="screen-title">${screenTitle}</h2>
        
        <!-- Filter Controls (Q6) -->
        <div class="products-filter-section">
            <div class="filter-grid">
                <div class="form-group" style="margin-bottom:0;">
                    <label for="filter-name">Search Name:</label>
                    <input type="text" id="filter-name" class="form-control" placeholder="Type keyword...">
                </div>
                <div class="form-group" style="margin-bottom:0;">
                    <label for="filter-category">Category:</label>
                    <select id="filter-category" class="form-control">
                        <option value="">-- All Categories --</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom:0;">
                    <label for="filter-min-price">Min Price (VND):</label>
                    <input type="number" id="filter-min-price" class="form-control" placeholder="Min" min="0">
                </div>
                <div class="form-group" style="margin-bottom:0;">
                    <label for="filter-max-price">Max Price (VND):</label>
                    <input type="number" id="filter-max-price" class="form-control" placeholder="Max" min="0">
                </div>
            </div>
        </div>

        <!-- Catalog Display Grid -->
        <div id="catalog-products-grid" class="products-grid"></div>
    `;

    // Populate category dropdown options
    const categorySelect = document.getElementById("filter-category");
    categoriesData.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.categoryId;
        option.textContent = cat.categoryName;
        categorySelect.appendChild(option);
    });

    // Add filter trigger listeners
    document.getElementById("filter-name").addEventListener("input", () => filterProducts());
    document.getElementById("filter-category").addEventListener("change", () => filterProducts());
    document.getElementById("filter-min-price").addEventListener("input", () => filterProducts());
    document.getElementById("filter-max-price").addEventListener("input", () => filterProducts());

    // Render all products initially
    renderProductCards(productsData);
}

function renderProductCards(products) {
    const grid = document.getElementById("catalog-products-grid");
    grid.innerHTML = "";

    if (products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <h3>No matching products found.</h3>
            </div>
        `;
        return;
    }

    products.forEach(p => {
        const categoryObj = categoriesData.find(c => c.categoryId === p.categoryId);
        const categoryName = categoryObj ? categoryObj.categoryName : "Other Accessories";

        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${p.imageUrl}" alt="${p.productName}" onerror="this.src='https://placehold.co/240x160/6366f1/ffffff?text=eHaHa+Device'">
            </div>
            <div class="product-details">
                <span class="product-category">${categoryName}</span>
                <h4 class="product-name">${p.productName}</h4>
                <div class="product-price">${formatCurrency(p.price)}</div>
                <p class="product-desc">${p.description || "Premium eHaHa certified technology item with full retail warranty support."}</p>
                <button class="btn btn-primary btn-buy" data-id="${p.productId}">🛒 Add to Cart</button>
            </div>
        `;

        // Bind Buy Button click (standard JavaScript listener)
        card.querySelector(".btn-buy").addEventListener("click", (e) => {
            const pid = e.target.getAttribute("data-id");
            addToCart(pid);
        });

        grid.appendChild(card);
    });
}

function filterProducts() {
    const searchName = document.getElementById("filter-name").value.trim().toLowerCase();
    const selectedCat = document.getElementById("filter-category").value;
    const minPrice = parseFloat(document.getElementById("filter-min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("filter-max-price").value) || Infinity;

    const filtered = productsData.filter(p => {
        const matchesName = p.productName.toLowerCase().includes(searchName);
        const matchesCategory = selectedCat === "" || p.categoryId === selectedCat;
        const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
        return matchesName && matchesCategory && matchesPrice;
    });

    renderProductCards(filtered);
}

// -------------------------------------------------------------
// CART SYSTEM (Q7)
// -------------------------------------------------------------
function addToCart(productId) {
    const product = productsData.find(p => p.productId === productId);
    if (!product) return;

    // Retrieve active cart list
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product is already in cart
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`"${product.productName}" added to cart!`);
}

function showCart() {
    const container = document.getElementById("part-b-container");
    container.innerHTML = `
        <h2 class="screen-title">
            <span>My Shopping Cart</span>
            <div>
                <button id="btn-clear-cart" class="btn btn-danger btn-sm">Clear Cart</button>
                <button id="btn-checkout" class="btn btn-primary btn-sm">Place Simulated Order</button>
            </div>
        </h2>
        <div id="cart-alert-container"></div>
        <div class="table-responsive">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Price (VND)</th>
                        <th>Quantity</th>
                        <th>Total (VND)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="cart-table-body"></tbody>
            </table>
        </div>
    `;

    document.getElementById("btn-clear-cart").addEventListener("click", () => clearCart());
    document.getElementById("btn-checkout").addEventListener("click", () => checkoutSimulatedOrder());
    renderCartItems();
}

function renderCartItems() {
    const tbody = document.getElementById("cart-table-body");
    tbody.innerHTML = "";

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px; color: var(--text-muted);">
                    Your cart is empty.
                </td>
            </tr>
        `;
        document.getElementById("btn-clear-cart").style.display = "none";
        document.getElementById("btn-checkout").style.display = "none";
        return;
    }

    document.getElementById("btn-clear-cart").style.display = "inline-block";
    document.getElementById("btn-checkout").style.display = "inline-block";

    let grandTotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.productName}</strong></td>
            <td>${formatCurrency(item.price)}</td>
            <td>
                <input type="number" class="form-control cart-qty-input" data-id="${item.productId}" value="${item.quantity}" min="1" style="width: 70px; padding: 5px; display: inline-block;">
            </td>
            <td style="font-weight: 700; color: var(--primary-color);">${formatCurrency(itemTotal)}</td>
            <td>
                <button class="btn btn-danger btn-sm btn-remove-item" data-id="${item.productId}">Delete</button>
            </td>
        `;

        // Update quantity handler
        tr.querySelector(".cart-qty-input").addEventListener("change", (e) => {
            const pid = e.target.getAttribute("data-id");
            const newQty = parseInt(e.target.value) || 1;
            updateCartQuantity(pid, newQty);
        });

        // Remove item handler
        tr.querySelector(".btn-remove-item").addEventListener("click", (e) => {
            const pid = e.target.getAttribute("data-id");
            removeCartItem(pid);
        });

        tbody.appendChild(tr);
    });

    // Add footer grand total row
    const footerTr = document.createElement("tr");
    footerTr.style.backgroundColor = "#f8fafc";
    footerTr.style.fontWeight = "700";
    footerTr.innerHTML = `
        <td colspan="4" style="text-align: right; font-size: 1.05rem;">Grand Total Amount:</td>
        <td style="font-size: 1.15rem; color: var(--danger-color); font-weight: 800;" colspan="2">${formatCurrency(grandTotal)}</td>
    `;
    tbody.appendChild(footerTr);
}

function updateCartQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.productId === productId);
    if (item) {
        item.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
    }
}

function removeCartItem(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(i => i.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    showToast("Product removed from cart.");
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCartItems();
    showToast("Shopping cart cleared.");
}

function checkoutSimulatedOrder() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        const alertContainer = document.getElementById("cart-alert-container");
        alertContainer.innerHTML = `
            <div class="alert-box alert-error">
                ⚠️ Please login first before placing an order.
            </div>
        `;
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return;

    // Create a new order object and push it into local custom order simulation database
    let localOrders = JSON.parse(localStorage.getItem("simulatedOrders")) || [];
    let localOrderDetails = JSON.parse(localStorage.getItem("simulatedOrderDetails")) || [];

    const newOrderId = "ORD" + (1000 + ordersData.length + localOrders.length + 1);

    // Calculate total amount
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        localOrderDetails.push({
            orderDetailId: `OD${newOrderId.substring(3)}_${localOrderDetails.length + 1}`,
            orderId: newOrderId,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price
        });
    });

    localOrders.push({
        orderId: newOrderId,
        customerId: currentUser.email || currentUser.username,
        employeeId: "EMP002", // Handled by Sales Manager fallback
        orderDate: new Date().toISOString(),
        status: "Pending",
        totalAmount: total
    });

    localStorage.setItem("simulatedOrders", JSON.stringify(localOrders));
    localStorage.setItem("simulatedOrderDetails", JSON.stringify(localOrderDetails));

    // Clear cart and show checkout message
    localStorage.removeItem("cart");

    const alertContainer = document.getElementById("cart-alert-container");
    alertContainer.innerHTML = `
        <div class="alert-box alert-success">
            🎉 Order ${newOrderId} has been successfully simulated! You can review sales lists in the Administrator dashboard.
        </div>
    `;
    renderCartItems();
    showToast("Order placed successfully!");
}

// -------------------------------------------------------------
// Q8 - LOGIN & LOGOUT
// -------------------------------------------------------------
function showLogin() {
    const container = document.getElementById("part-b-container");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        // Authenticated layout
        container.innerHTML = `
            <h2 class="screen-title">User Session Manager</h2>
            <div class="alert-box alert-success" style="margin-bottom: 25px;">
                🔑 Logged in as: <strong>${currentUser.fullName || currentUser.username}</strong> (${currentUser.role})
            </div>
            <p style="margin-bottom: 20px;">You are currently logged in to the eHaHa Business Web Portal. Choose action below:</p>
            <div>
                <button id="btn-logout" class="btn btn-danger">Logout Session</button>
            </div>
        `;
        document.getElementById("btn-logout").addEventListener("click", () => logout());
    } else {
        // Form layout
        container.innerHTML = `
            <h2 class="screen-title">Login Account</h2>
            <div id="login-alert-container"></div>
            <div class="form-container" style="max-width: 420px; margin: 0 auto; padding-top: 20px;">
                <form id="form-login-box">
                    <div class="form-group">
                        <label for="login-username">Username or Email Address:</label>
                        <input type="text" id="login-username" class="form-control" placeholder="Enter username / email" required>
                        <small style="color: var(--text-muted);">Standard options: customer1, sales1, staff1 or JSON emails</small>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Account Password:</label>
                        <input type="password" id="login-password" class="form-control" placeholder="Password" required>
                        <small style="color: var(--text-muted);">Default passwords: 123</small>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Login Portal</button>
                </form>
            </div>
        `;

        document.getElementById("form-login-box").addEventListener("submit", (e) => {
            e.preventDefault();
            login();
        });
    }
}

function login() {
    const usernameInput = document.getElementById("login-username").value.trim();
    const passwordInput = document.getElementById("login-password").value;
    const alertContainer = document.getElementById("login-alert-container");

    alertContainer.innerHTML = "";

    // 1. Check loaded JSON Database values (emails matches)
    let userFound = null;

    // Check customers
    const jsonCust = customersData.find(c => (c.email === usernameInput || c.customerId === usernameInput) && c.password === passwordInput);
    if (jsonCust) {
        userFound = {
            username: jsonCust.email,
            fullName: jsonCust.fullName,
            role: "Customer",
            email: jsonCust.email,
            phone: jsonCust.phone || ""
        };
    }

    // Check employees
    if (!userFound) {
        const jsonEmp = employeesData.find(e => (e.email === usernameInput || e.employeeId === usernameInput) && e.password === passwordInput);
        if (jsonEmp) {
            userFound = {
                username: jsonEmp.email,
                fullName: jsonEmp.fullName,
                role: "Employee",
                position: jsonEmp.position,
                email: jsonEmp.email,
                department: jsonEmp.department || ""
            };
        }
    }

    // 2. Check hardcoded fallback accounts
    if (!userFound) {
        if (usernameInput === "customer1" && passwordInput === "123") {
            userFound = {
                username: "customer1",
                fullName: "Jane Doe (Customer Demo)",
                role: "Customer",
                email: "customer1@ehaha.com"
            };
        } else if (usernameInput === "sales1" && passwordInput === "123") {
            userFound = {
                username: "sales1",
                fullName: "John Smith (Manager)",
                role: "Employee",
                position: "Sales Manager",
                email: "sales1@ehaha.com"
            };
        } else if (usernameInput === "staff1" && passwordInput === "123") {
            userFound = {
                username: "staff1",
                fullName: "Alice Cooper (Staff)",
                role: "Employee",
                position: "Staff",
                email: "staff1@ehaha.com"
            };
        }
    }

    if (userFound) {
        localStorage.setItem("currentUser", JSON.stringify(userFound));
        showToast("Login successful!");
        showLogin();
    } else {
        alertContainer.innerHTML = `
            <div class="alert-box alert-error">
                ❌ Invalid username, email or password. Please try again.
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    showToast("Logged out successfully.");
    showLogin();
}

// -------------------------------------------------------------
// Q9 - MY INFO
// -------------------------------------------------------------
function showMyInfo() {
    const container = document.getElementById("part-b-container");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        container.innerHTML = `
            <h2 class="screen-title">My Account Info</h2>
            <div class="alert-box alert-error">
                ⚠️ Please login first to view your account details.
            </div>
        `;
        return;
    }

    let roleFieldsHTML = "";
    if (currentUser.role === "Employee") {
        roleFieldsHTML = `
            <div class="info-item">
                <span class="info-label">Position:</span>
                <span class="info-value" style="color: var(--primary-color);">${currentUser.position || "N/A"}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Department:</span>
                <span class="info-value">${currentUser.department || "N/A"}</span>
            </div>
        `;
    } else {
        roleFieldsHTML = `
            <div class="info-item">
                <span class="info-label">Phone:</span>
                <span class="info-value">${currentUser.phone || "N/A"}</span>
            </div>
        `;
    }

    container.innerHTML = `
        <h2 class="screen-title">My Account Info</h2>
        <div class="about-me-card" style="align-items: flex-start;">
            <div class="about-me-avatar" style="border-color: var(--accent-color);">
                <img src="https://placehold.co/150x150/10b981/ffffff?text=${currentUser.role.substring(0, 4)}" alt="User Profile Image">
            </div>
            <div class="about-me-info">
                <div class="info-item">
                    <span class="info-label">Username:</span>
                    <span class="info-value">${currentUser.username}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Full Name:</span>
                    <span class="info-value">${currentUser.fullName || "Guest Account"}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Account Role:</span>
                    <span class="info-value" style="text-transform: uppercase;">${currentUser.role}</span>
                </div>
                ${roleFieldsHTML}
                <div class="info-item">
                    <span class="info-label">Email Address:</span>
                    <span class="info-value">${currentUser.email || "N/A"}</span>
                </div>
            </div>
        </div>
    `;
}

// -------------------------------------------------------------
// Q10 - ADMINISTRATOR DASHBOARD
// -------------------------------------------------------------
function showAdministrator() {
    const container = document.getElementById("part-b-container");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Guard Checks
    if (!currentUser) {
        container.innerHTML = `
            <h2 class="screen-title">Admin Dashboard</h2>
            <div class="alert-box alert-error">
                ⚠️ Please login first.
            </div>
        `;
        return;
    }

    if (currentUser.role !== "Employee" || currentUser.position !== "Sales Manager") {
        container.innerHTML = `
            <h2 class="screen-title">Admin Dashboard</h2>
            <div class="alert-box alert-error">
                ⛔ Access denied. Sales Manager only.
            </div>
        `;
        return;
    }

    // Load dynamic simulated databases from storage
    const localOrders = JSON.parse(localStorage.getItem("simulatedOrders")) || [];

    // Combine standard ordersData with simulated ones
    const allOrders = [...ordersData, ...localOrders];

    // Compute dynamic dashboard statistics
    const totalOrders = allOrders.length;
    let totalRevenue = 0;

    // Best-selling product calculation
    const localDetails = JSON.parse(localStorage.getItem("simulatedOrderDetails")) || [];
    const allDetails = [...orderDetailsData, ...localDetails];

    const productQuantities = {};
    allDetails.forEach(detail => {
        const pid = detail.productId;
        productQuantities[pid] = (productQuantities[pid] || 0) + detail.quantity;
    });

    let bestSellingProductId = "";
    let maxQty = 0;
    for (const pid in productQuantities) {
        if (productQuantities[pid] > maxQty) {
            maxQty = productQuantities[pid];
            bestSellingProductId = pid;
        }
    }

    const bestProduct = productsData.find(p => p.productId === bestSellingProductId);
    const bestProductText = bestProduct ? `${bestProduct.productName} (${maxQty} units)` : "None yet";

    allOrders.forEach(o => {
        totalRevenue += o.totalAmount;
    });

    container.innerHTML = `
        <h2 class="screen-title">Administrator Sales Console</h2>
        
        <!-- Summary Cards Row -->
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="card-label">Total Orders</div>
                <div class="card-value">${totalOrders}</div>
            </div>
            <div class="dashboard-card">
                <div class="card-label">Total Revenue</div>
                <div class="card-value" style="color: var(--danger-color);">${formatCurrency(totalRevenue)}</div>
            </div>
            <div class="dashboard-card">
                <div class="card-label">Best-Selling Product</div>
                <div class="card-value" style="font-size: 1rem; color: var(--accent-color); font-weight:700; margin-top:10px;">
                    ${bestProductText}
                </div>
            </div>
        </div>

        <h3>Orders List Log (Product Details)</h3>
        <div class="table-responsive">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th style="text-align: center;">Quantity</th>
                        <th style="text-align: right;">Unit Price</th>
                        <th style="text-align: right;">Total Amount</th>
                    </tr>
                </thead>
                <tbody id="admin-orders-table-body"></tbody>
            </table>
        </div>
    `;

    renderAdminOrders(allOrders);
}

function renderAdminOrders(orders) {
    const tbody = document.getElementById("admin-orders-table-body");
    tbody.innerHTML = "";

    const localDetails = JSON.parse(localStorage.getItem("simulatedOrderDetails")) || [];
    const allDetails = [...orderDetailsData, ...localDetails];

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No sales simulated in system yet.</td></tr>`;
        return;
    }

    orders.forEach(o => {
        // Find all detail items matching this order ID
        const details = allDetails.filter(d => d.orderId === o.orderId);

        if (details.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><code>${o.orderId}</code></td>
                <td><strong>${o.customerId}</strong></td>
                <td colspan="3"><em style="color: var(--text-muted);">No product items registered</em></td>
                <td style="text-align: right; font-weight: 700; color: var(--primary-color);">${formatCurrency(o.totalAmount)}</td>
            `;
            tbody.appendChild(tr);
        } else {
            details.forEach(d => {
                const prod = productsData.find(p => p.productId === d.productId);
                const prodName = prod ? prod.productName : `Product: ${d.productId}`;
                const itemTotal = d.quantity * d.unitPrice;

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><code>${o.orderId}</code></td>
                    <td><strong>${o.customerId}</strong></td>
                    <td>${prodName}</td>
                    <td style="text-align: center; font-weight: 600;">${d.quantity}</td>
                    <td style="text-align: right; color: var(--text-muted);">${formatCurrency(d.unitPrice)}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--primary-color);">${formatCurrency(itemTotal)}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    });
}

// -------------------------------------------------------------
// EXTRA SCREENS: EXTERNAL APIS, MYUEL PARSER & LARGE EMOJI ICON
// -------------------------------------------------------------
function showUELParser() {
    const container = document.getElementById("part-b-container");
    container.innerHTML = `
        <h2 class="screen-title">MyUEL Syllabus Raw Parser</h2>
        <div class="form-group">
            <label for="parser-textarea">Paste text schedules or subject contents (delimited by spaces or lines):</label>
            <textarea id="parser-textarea" class="form-control" placeholder="Example:&#10;BDG1012  PhysEdu 1  3.0&#10;EIE4048  RobotAutomation  2.0"></textarea>
        </div>
        <button id="btn-parse-text" class="btn btn-primary" style="margin-bottom: 25px;">Parse Text Content</button>

        <h3>Parsed Results Table</h3>
        <div class="table-responsive">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Subject Code</th>
                        <th>Subject Title</th>
                        <th>Credits</th>
                    </tr>
                </thead>
                <tbody id="parser-table-body">
                    <tr>
                        <td colspan="4" style="text-align: center; color: var(--text-muted);">Paste data and click Parse to check logs here.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    document.getElementById("btn-parse-text").addEventListener("click", () => parseRawUELText());
}

function parseRawUELText() {
    const raw = document.getElementById("parser-textarea").value.trim();
    const tbody = document.getElementById("parser-table-body");
    tbody.innerHTML = "";

    if (!raw) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--danger-color);">Please enter text inside the parsing area.</td></tr>`;
        return;
    }

    const lines = raw.split("\n");
    let validRows = 0;

    lines.forEach((line, index) => {
        const cleaned = line.trim();
        if (cleaned) {
            // Split by multiple spaces or tabs
            const tokens = cleaned.split(/\s{2,}/);

            // Try fallback split by simple tab or single space if token list is too short
            const fields = tokens.length >= 2 ? tokens : cleaned.split(/\t/);

            const finalFields = fields.length >= 2 ? fields : cleaned.split(/\s/);

            validRows++;
            const tr = document.createElement("tr");

            const code = finalFields[0] || "UNKNOWN";
            const name = finalFields[1] || "Parsed Subject Detail";
            const credits = finalFields[2] || "3.0";

            tr.innerHTML = `
                <td>${validRows}</td>
                <td><code>${code}</code></td>
                <td><strong>${name}</strong></td>
                <td>${credits}</td>
            `;
            tbody.appendChild(tr);
        }
    });

    if (validRows === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No records found. Check format patterns.</td></tr>`;
    } else {
        showToast(`Parsed ${validRows} subjects successfully!`);
    }
}

// -------------------------------------------------------------
// EXTERNAL APIS SCREEN
// -------------------------------------------------------------
function showIconScreen() {
    const container = document.getElementById("part-b-container");
    container.innerHTML = `
        <div class="center-icon-container">
            <div id="big-animated-icon" class="animated-icon">🛒</div>
            <div class="icon-label">eHaHa Premium E-Commerce Platform</div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 10px; font-weight: 500;">
                Click emoji to switch between Shopper Mode (🛒) and Global Gateway Mode (🌐)
            </p>
        </div>
    `;

    const emojiEl = document.getElementById("big-animated-icon");
    emojiEl.addEventListener("click", () => {
        if (emojiEl.textContent === "🛒") {
            emojiEl.textContent = "🌐";
            showToast("Icon switched to Global Gateway!");
        } else {
            emojiEl.textContent = "🛒";
            showToast("Icon switched to Shopping Cart!");
        }
    });
}

// Helper: VND currency formatting
function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
