<?php
require_once __DIR__ . '/../config.php';
if (isUser()) {
    redirect('feed.php');
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare('SELECT id, password FROM users WHERE email = ?');
    $stmt->bind_param('s', $email);
$stmt->execute();
$stmt->bind_result($uid, $hash);
$isValid = $stmt->fetch() && password_verify($password, $hash);
$stmt->close();
if ($isValid) {
    $_SESSION['user_id'] = $uid;
    $conn->query("UPDATE users SET last_login = NOW() WHERE id = {$uid}");
    redirect('feed.php');
} else {
    $error = 'Invalid username or password';
}
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <div class="container">
        <div class="animation"></div>
        <div class="form">
            <div class="above-txt">
                <div class="welcome">
                    <div class="left">
                        <p>Welcome back</p>
                        <h1>Sign in to continue donating</h1>
                        <p>Access your feed, wallet insights, and creator dashboards in one place</p>
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
                    <p><b>Demo mode -</b> sign in with your username to explore the platform</p>
                    <p>?</p>
                </div>
                <?php if ($error): ?>
                    <p style="color:#b91c1c;font-size:13px;padding-top:8px;"><?=$error?></p>
                <?php endif; ?>
                <form method="post">
                    <div class="lb">
                        <label><p>Email</p> <p>Use the email linked to your account</p></label>
                        <input name="email" type="email" placeholder="you@example.com" required>
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
                        <button type="submit">Continue to platform</button>
                        <p><a href="register.php" style="color:#06B6A4;text-decoration:none;">Create account</a></p>
                    </div>
                    <p class="p">By logging in, you agree to our terms and privacy.</p>
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

