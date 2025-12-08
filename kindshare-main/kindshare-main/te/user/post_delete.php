<?php
require_once __DIR__ . '/../config.php';
if (!isUser()) {
    redirect('login.php');
}

$uid = $_SESSION['user_id'];
$id = (int)($_GET['id'] ?? 0);
$conn->query("DELETE FROM posts WHERE id = {$id} AND user_id = {$uid}");
redirect('feed.php');

