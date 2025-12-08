<?php
require_once __DIR__ . '/../config.php';
if (isAdmin()) {
    redirect('dashboard.php');
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $stmt = $conn->prepare('SELECT id, password FROM admins WHERE username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->bind_result($aid, $hash);
    $valid = $stmt->fetch() && password_verify($password, $hash);
    $stmt->close();
    if ($valid) {
        $_SESSION['admin_id'] = $aid;
        $conn->query("UPDATE admins SET last_login = NOW() WHERE id = {$aid}");
        redirect('dashboard.php');
    } else {
        $error = 'Invalid credentials';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="container">
        <div class="animation"></div>
        <div class="form">
            <div class="above-txt">
                <div class="welcome">
                    <div class="left">
                        <p>Admin console</p>
                        <h1>Sign in to manage KindShare</h1>
                        <p>View every donation, user, and post with full control.</p>
                    </div>
                    <div class="right">
                        <p>Step 1 of 2</p>
                        <div class="dot">
                            <div></div><div></div>
                        </div>
                    </div>
                </div>
                <div class="middle">
                    <div class="left-btn">
                        <p>Login</p>
                        <a href="register.php" style="text-decoration:none;color:#6B7280;"><p>Sign up</p></a>
                    </div>
                    <div class="right-sid">
                        <input type="checkbox" checked disabled>
                        Continue with Google
                    </div>
                </div>
            </div>
            <div class="form-cont">
                <div class="banner">
                    <p><b>Admin mode -</b> only trusted team members should log in</p>
                    <p>?</p>
                </div>
                <?php if ($error): ?><p style="color:#b91c1c;font-size:13px;padding-top:8px;"><?=$error?></p><?php endif; ?>
                <form method="post">
                    <div class="lb">
                        <label><p>Username</p> <p>Admin account</p></label>
                        <input name="username" type="text" placeholder="admin" required>
                    </div>
                    <div class="lb">
                        <label><p>Password</p> <p>At least 8 characters</p></label>
                        <input name="password" type="password" placeholder="********" required>
                    </div>
                    <div class="mid">
                        <p><input type="checkbox" checked> keep me signed in</p>
                        <p>Forgot password?</p>
                    </div>
                    <div class="btn">
                        <button type="submit">Continue to admin</button>
                        <p><a href="register.php" style="color:#06B6A4;text-decoration:none;">Create admin</a></p>
                    </div>
                    <p class="p">By logging in, you agree to internal admin policies.</p>
                </form>
            </div>
        </div>
    </div>
    <script src="https://unpkg.com/lottie-web/build/player/lottie.min.js"></script>
    <script>
        lottie.loadAnimation({
            container: document.querySelector('.animation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../Animated Dashboards.json'
        });
    </script>
</body>
</html>




