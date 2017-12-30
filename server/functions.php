<?php 
require_once 'db.php';

// USERSZ
$insertUser = function($username, $password, $level) use($conn){
    $stmt = oci_parse($conn, "insert into users(username, password, user_level)
              values('$username', '$password', '$level')");
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
};
$getUsers = function() use ($conn){
	$stid = oci_parse($conn, 'SELECT * FROM users');
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};
$getUser = function($username, $password) use($conn){
    $stid = oci_parse($conn, "SELECT * FROM users WHERE username =  '$username'  AND password = '$password'");
    oci_execute($stid);
    $data = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS);
    return $data;
};
$deleteUser = function($id) use ($conn){
    $stmt = oci_parse($conn, "delete from users where id = $id");
    oci_execute($stmt, OCI_DEFAULT);
    echo oci_num_rows($stmt) . " rows deleted.<br />\n";
    oci_commit($conn);
};


// PRODUCTS
// INSERER UN PRODUIT
$insertProduct = function($title, $price, $oldprice, $description, $cat, $marque) use($conn){
    $stmt = oci_parse($conn, "insert into products(title, price, oldprice, description, catid, marqueid) values('$title', $price, $oldprice, '$description', $cat, $marque)");
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
};
// RECUPERER LES PRODUITS AYANT UNE IMAGE
$getProducts = function() use ($conn){
    $stid = oci_parse($conn, 'SELECT p.*, i.path FROM products p inner join images i on i.articleid = p.id');
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};
// RECUPERER TOUS LES PRODUITS
$allProducts = function() use ($conn){
    $stid = oci_parse($conn, 'SELECT * from products');
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};
// RECUPERER LES PRODUITS PAR CATEGORIE
$productsByCat = function($catid) use ($conn){
    $stid = oci_parse($conn, 'SELECT p.*, i.path FROM products p inner join images i on i.articleid = p.id inner join categories c on c.id = p.catid where c.id = ' . $catid);
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};
// RECUPERER LES PRODUITS PAR MARQUE
$productsByMarque = function($marqueid) use ($conn){
    $stid = oci_parse($conn, 'SELECT p.*, i.path FROM products p inner join images i on i.articleid = p.id where marqueid = ' . $marqueid);
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};
// RECUPERER LE DERNIER PRODUIT
$getLastProduct = function() use($conn){
    $stid = oci_parse($conn, "SELECT * FROM products WHERE id = (select MAX(id) from products)");
    oci_execute($stid);
    $data = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS);
    $desc = $data['DESCRIPTION']->load();
    $data['DESCRIPTION'] = $desc;
    return $data;
};
// SUPPRIMER UN PRODUIT
$deleteProduct = function($id) use ($conn){
    $stmt = oci_parse($conn, "delete from products where id = $id");
    oci_execute($stmt, OCI_DEFAULT);
    echo oci_num_rows($stmt) . " rows deleted.<br />\n";
    oci_commit($conn);
};
// RECUPERER UN PRODUIT PAR ID
$getProduct = function($id) use ($conn){
    $stid = oci_parse($conn, "SELECT p.*, i.path, c.TITLE as category, c.id as catid FROM products p inner join images i on i.articleid = p.id inner join categories c on c.id = p.catid where p.id = " . $id);
    oci_execute($stid);
    $data = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS);
    $desc = $data['DESCRIPTION']->load();
    $data['DESCRIPTION'] = $desc;
    return $data;
};


// IMAGES
$insertImage = function($path, $productid) use($conn){
    $stmt = oci_parse($conn, "insert into images(path, articleid) values('$path', $productid)");
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
};


// CATEGORIES
$insertCategory = function($title) use($conn){
    $stmt = oci_parse($conn, "insert into categories(title) values('$title')");
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
};
$getCategories = function() use($conn){
    $stid = oci_parse($conn, 'SELECT * FROM categories');
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};
$getCategory = function($id) use ($conn){
    $stid = oci_parse($conn, 'SELECT * from categories where id = ' . $id);
    oci_execute($stid);
    $data = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS);
    return $data;
};
$deleteCategory = function($id) use($conn){
    $stmt = oci_parse($conn, "delete from categories where id = $id");
    oci_execute($stmt, OCI_DEFAULT);
    echo oci_num_rows($stmt) . " rows deleted.<br />\n";
    oci_commit($conn);
};


// MARQUES
$insertMarque = function($title) use($conn){
    $stmt = oci_parse($conn, "insert into marques(title) values('$title')");
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
};
$getMarques = function() use($conn){
    $stid = oci_parse($conn, 'SELECT * FROM marques');
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};
$getMarque = function($id) use ($conn){
    $stid = oci_parse($conn, 'SELECT * from marques where id = ' . $id);
    oci_execute($stid);
    $data = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS);
    return $data;
};
$deleteMarque = function($id) use($conn){
    $stmt = oci_parse($conn, "delete from marques where id = $id");
    oci_execute($stmt, OCI_DEFAULT);
    echo oci_num_rows($stmt) . " rows deleted.<br />\n";
    oci_commit($conn);
};

// CART
$insertCart = function($date, $user) use($conn){
    $stmt = oci_parse($conn, "insert into panier(panierdate, userid) values(to_date('".$date."','dd-mm-yy hh24:mi:ss'), '".$user."') RETURNING id INTO :ID");
    oci_bind_by_name($stmt, ':ID', $id, 2);
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
    return $id;
};

$insertCartProducts = function($product, $cart, $qty) use($conn){
    $stmt = oci_parse($conn, "insert into article_panier(articleid, panierid, qty) values(".$product.", ".$cart.", ".$qty.")");
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
};


// COMMANDES
$getCommandes = function() use($conn){
    $stid = oci_parse($conn, 'select p.*, u.username from panier p inner join users u on u.id = p.userid');
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};

$deleteCommande = function($id) use($conn){
    $stmt = oci_parse($conn, "delete from panier where id = $id");
    oci_execute($stmt, OCI_DEFAULT);
    echo oci_num_rows($stmt) . " rows deleted.<br />\n";
    oci_commit($conn);
};

$validerCommande = function($id) use($conn){
    $stmt = oci_parse($conn, "update panier set statutpaiement = 'true' where id = $id");
    oci_execute($stmt, OCI_DEFAULT);
    echo oci_num_rows($stmt) . " rows updated.<br />\n";
    oci_commit($conn);
};

// MESSAGES
$insertMessage = function($name, $email, $message) use($conn){
    $stmt = oci_parse($conn, "insert into messages(name, email, message) values('".$name."', '".$email."', '".$message."')");
    oci_execute($stmt, OCI_DEFAULT);
    oci_commit($conn);
};


$getMessages = function() use($conn){
    $stid = oci_parse($conn, 'select * from messages');
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};

$deleteMessage = function($id) use($conn){
    $stmt = oci_parse($conn, "delete from messages where id = $id");
    oci_execute($stmt, OCI_DEFAULT);
    echo oci_num_rows($stmt) . " rows deleted.<br />\n";
    oci_commit($conn);
};

// SEARCH
$search = function($keyword) use ($conn){
    $stid = oci_parse($conn, "SELECT p.id, p.title, p.price, p.oldprice, i.path FROM products p, images i where i.articleid = p.id and lower(p.title) like lower('%$keyword%')");
    oci_execute($stid);
    oci_fetch_all($stid, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    return $data;
};

