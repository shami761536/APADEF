<?php
require_once __DIR__ . '/../config.php';
if (isAdmin()) {
    redirect('dashboard.php');
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    if ($username && $email && strlen($password) >= 6) {
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare('INSERT INTO admins(username,email,password) VALUES(?,?,?)');
        $stmt->bind_param('sss', $username, $email, $hash);
        if ($stmt->execute()) {
            redirect('login.php');
        } else {
            $error = 'Username or email exists';
        }
        $stmt->close();
    } else {
        $error = 'Fill all fields (min 6 char password)';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Admin</title>
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
                        <h1>Create an admin account</h1>
                        <p>Grant access to trusted team members to manage everything.</p>
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
                        <a href="login.php" style="text-decoration:none;color:#6B7280;"><p>Login</p></a>
                        <p>Sign up</p>
                    </div>
                    <div class="right-sid">
                        <input type="checkbox" checked disabled>
                        Continue with Google
                    </div>
                </div>
            </div>
            <div class="form-cont">
                <div class="banner">
                    <p><b>Security note -</b> admins can view all users, donations, and posts.</p>
                    <p>?</p>
                </div>
                <?php if ($error): ?><p style="color:#b91c1c;font-size:13px;padding-top:8px;"><?=$error?></p><?php endif; ?>
                <form method="post">
                    <div class="lb">
                        <label><p>Username</p></label>
                        <input name="username" type="text" placeholder="admin" required>
                    </div>
                    <div class="lb">
                        <label><p>Email</p></label>
                        <input name="email" type="email" placeholder="admin@example.com" required>
                    </div>
                    <div class="lb">
                        <label><p>Password</p> <p>At least 6 characters</p></label>
                        <input name="password" type="password" placeholder="********" required>
                    </div>
                    <div class="btn">
                        <button type="submit">Create admin</button>
                        <p><a style="color:#06B6A4;text-decoration:none;" href="login.php">Back to login</a></p>
                    </div>
                    <p class="p">Admin accounts carry full access. Keep credentials secure.</p>
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




