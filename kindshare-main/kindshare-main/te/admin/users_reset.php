<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}
$id = (int)($_POST['id'] ?? 0);
$pass = $_POST['password'] ?? '';
if ($id && $pass) {
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    $conn->query("UPDATE users SET password = '{$hash}' WHERE id = {$id}");
    $conn->query("INSERT INTO admin_logs(admin_id, action_type, details) VALUES ({$_SESSION['admin_id']}, 'reset_password', 'user {$id}')");
}
redirect('users.php');




