<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<title></title>
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

<link href="/../finder.css" rel="stylesheet">
<link rel="stylesheet" href="">
<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<link rel="shortcut icon" href="">
<style type="text/css">
	#finder {
		padding: 10px;
	}
</style>
</head>
<body>

<div id="finder"></div>

<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script src="https://raw.githubusercontent.com/sydcanem/bootstrap-contextmenu/master/bootstrap-contextmenu.js"></script>

<!-- this demo also used for developement purpose, so we will just use the src instead of dist -->
<script src="/../src/DOM.js"></script>
<script src="/../src/file.js"></script>
<script src="/../src/finder.js"></script>

<!-- but if you in production mode, it's recomended to use minified version -->
<!-- <script src="/../dis/finder.min.js"></script> -->

<script type="text/javascript">
	(function($){

		$('#finder').dtfinder({
			url: 'demo/server.php',
			width: '1000px',
			permissions: {
				create: 1,
				move: 1,
				delete: 1,
			},
			classes: {
				collapse: 'fa fa-plus-square-o',
				expand: 'fa fa-minus-square-o'
			}
		});

	})(jQuery);
</script>
</body>
</html>