<?php
require_once __DIR__ . '/../config.php';
if (!isAdmin()) {
    redirect('login.php');
}
$id = (int)($_POST['id'] ?? 0);
if ($id) {
    $conn->query("DELETE FROM users WHERE id = {$id}");
    $conn->query("INSERT INTO admin_logs(admin_id, action_type, details) VALUES ({$_SESSION['admin_id']}, 'delete_user', 'user {$id}')");
}
redirect('users.php');




