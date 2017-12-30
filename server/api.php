<?php 
require_once 'functions.php';

header("Content-Type=>application/json");
$response['status']=200;
$response['status_message']="Success";


if(isset($_GET['action'])){
	if($_GET['action'] == 'getusers') $data = $getUsers();
	if($_GET['action'] == 'get-user'){
		$username = $_GET['username'];
		$password = $_GET['password'];

		$data = $getUser($username, $password);
	}

	if($_GET['action'] == 'delete-user'){
		$id = $_GET['id'];
		
		$deleteUser($id);
		$data = $id;
	}

	if($_GET['action'] == 'add-user'){
		$username = $_GET['username'];
		$password = $_GET['password'];
		$level = $_GET['level'];

		$insertUser($username, $password, $level);
		$data = $username;
	}

	// PRODUITS
	if($_GET['action'] == 'all-products') $data = $allProducts();
	if($_GET['action'] == 'products') {
		if(!isset($_GET['catid']) && !isset($_GET['marqueid'])){
			$data = $getProducts();
		}else if(isset($_GET['catid'])){
			$id = $_GET['catid'];
			$data = $productsByCat($id);
		}else if(isset($_GET['marqueid'])){
			$id = $_GET['marqueid'];
			$data = $productsByMarque($id);
		}
	}

	if($_GET['action'] == 'add-product'){
		$title = $_POST['title'];
		$price = $_POST['price'];
		$oldprice = $_POST['oldprice'];
		$description = $_POST['description'];
		$cat = $_POST['cat'];
		$marque = $_POST['marque'];

		$insertProduct($title, $price, $oldprice, $description, $cat, $marque);
		$data = $title;
	}
	if($_GET['action'] == 'last-product') $data = $getLastProduct();
	if($_GET['action'] == 'delete-product'){
		$id = $_GET['id'];
		$deleteProduct($id);
		$data = $id;
	} 
	if($_GET['action'] == 'product'){
		$id = $_GET['id'];
		$data = $getProduct($id);
	}

	// CATEGORIES
	if($_GET['action'] == 'add-category'){
		$title = $_GET['title'];

		$insertCategory($title);
		$data = $title;
	}

	if($_GET['action'] == 'categories') $data = $getCategories();
	if($_GET['action'] == 'category'){
		$id = $_GET['id'];

		$data = $getCategory($id);
	}

	if($_GET['action'] == 'delete-category'){
		$id = $_GET['id'];
		
		$deleteCategory($id);
		$data = $id;
	}

	// MARQUES
	if($_GET['action'] == 'add-marque'){
		$title = $_GET['title'];

		$insertMarque($title);
		$data = $title;
	}

	if($_GET['action'] == 'marques') $data = $getMarques();
	if($_GET['action'] == 'marque') {
		$id = $_GET['id'];
		$data = $getMarque($id);
	}
	if($_GET['action'] == 'delete-marque'){
		$id = $_GET['id'];
		
		$deleteMarque($id);
		$data = $id;
	}

	// IMAGES
	if($_GET['action'] == 'add-image'){
		$productid = $_POST['id'];
		$path = $_POST['path'];

		$insertImage($path, $productid);
		$data = $productid;
	}

	// CART
	if($_GET['action'] == 'cart'){
		$id = $_GET['id'];

		$data = $insertCart(date('d-m-Y'), $id);
	}

	if($_GET['action'] == 'cart-products'){
		$productid = $_GET['productid'];
		$cartid = $_GET['cartid'];
		$qty = $_GET['qty'];

		$insertCartProducts($productid, $cartid, $qty);
		$data = 'done';
	}

	// COMMANDES
	if($_GET['action'] == 'commandes') $data = $getCommandes();

	if($_GET['action'] == 'delete-commande'){
		$id = $_GET['id'];
		
		$deleteCommande($id);
		$data = $id;
	}

	if($_GET['action'] == 'validate-commande'){
		$id = $_GET['id'];
		
		$validerCommande($id);
		$data = $id;
	}

	if($_GET['action'] == 'send-message'){
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];

		$insertMessage($name, $email, $message);
		$data = "message sent";
	}

	// MESSAGES
	if($_GET['action'] == 'messages') $data = $getMessages();

	if($_GET['action'] == 'delete-message'){
		$id = $_GET['id'];
		
		$deleteMessage($id);
		$data = $id;
	}

	// RECHERCHE
	if($_GET['action'] == 'search'){
		$keyword = $_GET['keyword'];
		
		$data = $search($keyword);
		//var_dump($data);
	}
}

if(isset($_GET['username']) && $_GET['username'] !== ''){
    $user = $_GET['username'];
    $pass = $_GET['password'];

    $data = $getUser($user, $pass);
    if(count($data) == 0){
        $response['status'] = 400;
        $response['message'] = 'user not found';
    }
}

$response['data']=$data;

$json_response = json_encode($response);
echo $json_response;