<?php
// Basic DB connection + helpers used by both user and admin sites.
// Use correct host; change if your MySQL runs elsewhere.
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'social_system';

// Base URL for links/assets. Set to your app path (e.g. '/te'). Default ''.
$BASE_URL = '/te';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function isUser(): bool
{
    return isset($_SESSION['user_id']);
}

function isAdmin(): bool
{
    return isset($_SESSION['admin_id']);
}

function asset(string $path): string
{
    global $BASE_URL;
    return rtrim($BASE_URL, '/') . '/' . ltrim($path, '/');
}

function redirect(string $path): void
{
    header("Location: {$path}");
    exit;
}

