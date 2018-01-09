<?php
// index testes

	//path
	$path = '../teste';
	$diretorio = dir($path);
  $total = 0;
?>
<html>
<head>
	<title>Home de Testes</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<style type="text/css">
	body {
		background: #ddd;
	}
	.list {
		display: block;
		color: #666;
	}
	</style>
</head>
<body>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container" style="padding-top:15px; text-align:center; color:#fff;">
	   		<h4>BlackCoffeePHP 1.0</h4>
		</div>
	</nav>
	<br><br><br><br><br>
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3>Home de Teste - BlackCoffeePHP<h3>
			</div>
			<div class="panel-body">
				<ul>
					<?php
						while ($arquivo = $diretorio -> read()) {
							$label = substr($arquivo, 0, strrpos($arquivo, "."));
							if(strlen($label) >  3 && $label != "index") {
								$total++;
								?>
									<li><a  class="list" href="<?php echo $arquivo ?>"><label><?php echo ucfirst($label) ?></label></a></li>
								<?php
							}
						}
					?>
				</ul>
			</div>
			<div class="panel-footer">
				<div> Foram listadas <?php echo $total ?> Classes</div>
			</div>
		</div>
	</div>
	<br><br><br><br><br>
	<nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">
		<div class="container" style="padding-top:15px; text-align:center; color:#fff;">
	         BlackCoffeePHP 2016 - by Adelson Guimarães
	    </div>
	</nav>

	<script ../src="https://code.jquery.com/jquery-2.2.4.min.js"   integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="   crossorigin="anonymous"></script>
	<script ../src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	<script type="text/javascript">
		$(function () {
			$('#gerar').click( function () {
			if($('#host').val() === '' || $('#user').val() === '' || $('#banco').val() === '') {
					return false;
				}
			});
		});
	</script>
</body>
<!-- Classe gerada com BlackCoffeePHP 1.0 - by Adelson Guimarães -->
</html>
