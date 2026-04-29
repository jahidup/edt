(() => {
  const KEYS = { users: 'users', courses: 'courses', enrollments: 'enrollments', currentUser: 'currentUser', adminAuth: 'adminAuth' };
  const ADMIN = { email: 'admin@pathshala.com', password: 'admin123' };

  const get = (k, fb = []) => JSON.parse(localStorage.getItem(k) || JSON.stringify(fb));
  const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const toast = (msg, type = 'success') => {
    const t = document.createElement('div'); t.className = `toast ${type}`; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2400);
  };

  const seedCourses = () => {
    if (get(KEYS.courses, []).length) return;
    const sample = [
      { id: Date.now(), title: 'Full Stack Web Development', description: 'Master HTML, CSS, JavaScript, React, Node.js and MongoDB with real projects.', price: 4999 },
      { id: Date.now() + 1, title: 'Data Science with Python', description: 'Learn Python, NumPy, Pandas, visualization and machine learning foundations.', price: 5999 },
      { id: Date.now() + 2, title: 'Cyber Security Essentials', description: 'Understand ethical hacking, network security and best security practices.', price: 4499 }
    ];
    set(KEYS.courses, sample);
  };

  const renderCourses = (id, limit) => {
    const wrap = document.getElementById(id); if (!wrap) return;
    const courses = get(KEYS.courses, []);
    const list = limit ? courses.slice(0, limit) : courses;
    wrap.innerHTML = list.map(c => `<article class="card"><h3>${c.title}</h3><p>${c.description}</p><p class="price">₹${c.price}</p><a class="btn" href="course-detail.html?id=${c.id}">View Details</a></article>`).join('') || '<p>No courses available.</p>';
  };

  const initCourseDetail = () => {
    const box = document.getElementById('courseDetail'); if (!box) return;
    const id = Number(new URLSearchParams(location.search).get('id'));
    const c = get(KEYS.courses, []).find(x => x.id === id);
    if (!c) { box.innerHTML = '<h2>Course not found</h2>'; return; }
    box.innerHTML = `<h1>${c.title}</h1><p>${c.description}</p><h3>Lecture Preview</h3><ul><li>Introduction & Roadmap</li><li>Core Concepts</li><li>Project Walkthrough</li></ul><p class="price">Price: ₹${c.price}</p><button class="btn" id="buyNowBtn">Buy Now</button>`;
    document.getElementById('buyNowBtn').addEventListener('click', () => {
      const user = get(KEYS.currentUser, null);
      if (!user) { toast('Please login first.', 'error'); setTimeout(() => location.href = 'login.html', 700); return; }
      const msg = `Hello Admin,%0AName: ${encodeURIComponent(user.name)}%0AEmail: ${encodeURIComponent(user.email)}%0ACourse: ${encodeURIComponent(c.title)}`;
      window.open(`https://wa.me/?text=${msg}`, '_blank');
    });
  };

  const initRegister = () => {
    const form = document.getElementById('registerForm'); if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = regName.value.trim(), email = regEmail.value.trim().toLowerCase(), phone = regPhone.value.trim(), pw = regPassword.value, cpw = regConfirm.value;
      if (!name || !email || !phone || !pw) return toast('All fields are required.', 'error');
      if (pw.length < 6) return toast('Password must be at least 6 chars.', 'error');
      if (pw !== cpw) return toast('Passwords do not match.', 'error');
      const users = get(KEYS.users, []);
      if (users.some(u => u.email === email)) return toast('Email already exists.', 'error');
      users.push({ name, email, phone, password: pw });
      set(KEYS.users, users); toast('Registration successful. Please login.'); form.reset();
      setTimeout(() => location.href = 'login.html', 600);
    });
  };

  const initLogin = () => {
    const form = document.getElementById('loginForm'); if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button'); btn.innerHTML = '<span class="loader"></span>Logging in...';
      const email = loginEmail.value.trim().toLowerCase(), pw = loginPassword.value;
      setTimeout(() => {
        const user = get(KEYS.users, []).find(u => u.email === email && u.password === pw);
        btn.textContent = 'Login';
        if (!user) return toast('Invalid credentials.', 'error');
        set(KEYS.currentUser, user); toast('Login successful.'); location.href = 'dashboard.html';
      }, 550);
    });
  };

  const initStudentDashboard = () => {
    const content = document.getElementById('studentContent'); if (!content) return;
    const user = get(KEYS.currentUser, null); if (!user) { location.href = 'login.html'; return; }
    const enrollments = get(KEYS.enrollments, []);
    const courses = get(KEYS.courses, []);
    const mine = enrollments.filter(e => e.userEmail === user.email).map(e => courses.find(c => c.id === e.courseId)).filter(Boolean);

    const render = (view = 'home') => {
      document.querySelectorAll('[data-student-view]').forEach(a => a.classList.toggle('active', a.dataset.studentView === view));
      if (view === 'home') content.innerHTML = `<h2>Welcome, ${user.name}</h2><p class="muted">You are enrolled in <strong>${mine.length}</strong> course(s).</p>`;
      if (view === 'mycourses') {
        content.innerHTML = mine.length ? mine.map(c => `<div class="card"><h3>${c.title}</h3><p>${c.description}</p><button class="btn secondary" data-open-course="${c.id}">Open Course Content</button></div>`).join('') : '<p>No enrolled courses yet.</p>';
      }
      content.querySelectorAll('[data-open-course]').forEach(btn => btn.onclick = () => {
        const c = courses.find(x => x.id === Number(btn.dataset.openCourse));
        if (!c) return;
        content.innerHTML = `<h2>${c.title}</h2><h3>Lectures</h3><ul><li>Lecture 1 - Overview</li><li>Lecture 2 - Fundamentals</li><li>Lecture 3 - Build Project</li></ul><h3>Video</h3><iframe width="100%" height="320" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Lecture video" allowfullscreen></iframe><h3>Notes</h3><p><a class="btn secondary" href="https://drive.google.com" target="_blank">Open Notes</a></p>`;
      });
    };
    render();
    document.querySelectorAll('[data-student-view]').forEach(link => link.addEventListener('click', () => render(link.dataset.studentView)));
    const logout = document.getElementById('studentLogout'); if (logout) logout.onclick = () => { localStorage.removeItem(KEYS.currentUser); location.href = 'login.html'; };
  };

  const initAdmin = () => {
    const authBox = document.getElementById('adminAuth'), panel = document.getElementById('adminPanel');
    if (!authBox || !panel) return;
    const showPanel = () => { authBox.style.display = 'none'; panel.style.display = 'grid'; renderAdmin('dashboard'); };
    if (get(KEYS.adminAuth, false)) showPanel();

    const adminLoginForm = document.getElementById('adminLoginForm');
    adminLoginForm?.addEventListener('submit', e => {
      e.preventDefault();
      if (adminEmail.value.trim().toLowerCase() === ADMIN.email && adminPassword.value === ADMIN.password) {
        set(KEYS.adminAuth, true); toast('Admin login success.'); showPanel();
      } else toast('Invalid admin credentials.', 'error');
    });

    const renderAdmin = (view) => {
      const content = document.getElementById('adminContent');
      document.querySelectorAll('[data-admin-view]').forEach(a => a.classList.toggle('active', a.dataset.adminView === view));
      const courses = get(KEYS.courses, []), users = get(KEYS.users, []), en = get(KEYS.enrollments, []);
      if (view === 'dashboard') content.innerHTML = `<h2>Admin Dashboard</h2><p>Total Courses: <strong>${courses.length}</strong></p><p>Total Students: <strong>${users.length}</strong></p><p>Total Enrollments: <strong>${en.length}</strong></p>`;
      if (view === 'courses') content.innerHTML = `<h2>Manage Courses</h2><form id="addCourseForm" class="card"><div class="form-group"><label>Title</label><input id="courseTitle" required></div><div class="form-group"><label>Description</label><textarea id="courseDescription" required></textarea></div><div class="form-group"><label>Price</label><input id="coursePrice" type="number" required></div><button class="btn" type="submit">Add Course</button></form><h3>Course List</h3><table class="table"><thead><tr><th>Title</th><th>Price</th><th>Action</th></tr></thead><tbody>${courses.map(c => `<tr><td>${c.title}</td><td>₹${c.price}</td><td><button class="btn danger" data-del-course="${c.id}">Delete</button></td></tr>`).join('')}</tbody></table>`;
      if (view === 'students') content.innerHTML = `<h2>Students</h2><table class="table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th></tr></thead><tbody>${users.map(u => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.phone}</td></tr>`).join('') || '<tr><td colspan="3">No students found.</td></tr>'}</tbody></table>`;
      if (view === 'assign') content.innerHTML = `<h2>Assign Course</h2><form id="assignForm" class="card"><div class="form-group"><label>Select Student</label><select id="assignUser" required><option value="">Choose student</option>${users.map(u => `<option value="${u.email}">${u.name} (${u.email})</option>`).join('')}</select></div><div class="form-group"><label>Select Course</label><select id="assignCourse" required><option value="">Choose course</option>${courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}</select></div><button class="btn" type="submit">Assign</button></form>`;

      document.getElementById('addCourseForm')?.addEventListener('submit', e => {
        e.preventDefault(); const title = courseTitle.value.trim(), description = courseDescription.value.trim(), price = Number(coursePrice.value);
        if (!title || !description || price <= 0) return toast('Please enter valid course details.', 'error');
        const all = get(KEYS.courses, []); all.push({ id: Date.now(), title, description, price }); set(KEYS.courses, all); toast('Course added.'); renderAdmin('courses');
      });
      content.querySelectorAll('[data-del-course]').forEach(b => b.onclick = () => { set(KEYS.courses, get(KEYS.courses, []).filter(c => c.id !== Number(b.dataset.delCourse))); toast('Course deleted.'); renderAdmin('courses'); });
      document.getElementById('assignForm')?.addEventListener('submit', e => {
        e.preventDefault(); const userEmail = assignUser.value, courseId = Number(assignCourse.value);
        const all = get(KEYS.enrollments, []); if (all.some(x => x.userEmail === userEmail && x.courseId === courseId)) return toast('Already assigned.', 'error');
        all.push({ userEmail, courseId }); set(KEYS.enrollments, all); toast('Course assigned successfully.');
      });
    };

    panel.querySelectorAll('[data-admin-view]').forEach(l => l.addEventListener('click', () => renderAdmin(l.dataset.adminView)));
    document.getElementById('adminLogout')?.addEventListener('click', () => { localStorage.removeItem(KEYS.adminAuth); location.reload(); });
  };

  seedCourses();
  renderCourses('featuredCourses', 3);
  renderCourses('allCourses');
  initCourseDetail();
  initRegister();
  initLogin();
  initStudentDashboard();
  initAdmin();
})();
