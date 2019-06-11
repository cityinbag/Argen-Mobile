<?php
//where replace(replace(replace(cc.cpf, \'.\', \'\'), \'-\', \'\'), \'/\' , \'\') = :login 

	header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');         
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-with');	
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');         
	header('Content-Type: application/json; charset=utf-8');    // cache for 1 day
	header('Access-Control-Max-Age: 86400');    // cache for 1 day

	include "lib/config.php";
	
    $postjson = json_decode(file_get_contents('php://input'), true);


	//----------------------------------------------------
	// Lista de todos os Animais - Sem filtro
	//----------------------------------------------------

	if ($postjson['ask']=='getAnimais') {
			
		$dataAnimal  = array();
		//$sql = " select cod, titulo, foto from tbl_genetica order by cod limit $postjson[start], $postjson[limit] ";
		
		$sql = " select gen.cod as cod_animal,
					    gen.titulo as nome_animal,
					    gen.foto as foto_animal,
					    gen_cat.cod_categoria as cod_categoria,
					    gen_cat.titulo as titulo_categoria,
					    gen_scat.cod_subcategoria as cod_subcategoria,
					    gen_scat.titulo as titulo_subcategoria
				 from tbl_genetica gen
				   join tbl_genetica_subcategoria gen_scat
					 on (gen_scat.cod_subcategoria = gen.cod_subcategoria)
				   join tbl_genetica_categoria gen_cat
					 on (gen_cat.cod_categoria = gen_scat.cod_categoria)
				 where gen.disponivel = 1 
				 order by gen.cod asc
                                 limit " . $postjson['inicio'] . "," . $postjson['limite'] ;		                                 
				 
	
		$query = mysqli_query($mysqli, $sql);
                
                $rowcount=mysqli_num_rows($query);
			
		if ($rowcount > 0){
			while($row = mysqli_fetch_array($query)){
	
		                $row = array_map('utf8_encode', $row); //tratamento para caracteres especiais não quebrar o retorno do JSON.
	
				$dataAnimal['animais'][] = array(
					'cod_animal' => $row['cod_animal'],
					'nome_animal' => $row['nome_animal'],
					'foto_animal' => 'http://www.argen.com.br/arquivos/genetica/970x647_' . $row['foto_animal'],
					'categoria' => array(
							'cod_categoria' => $row['cod_categoria'],
							'titulo_categoria' => $row['titulo_categoria']
							),
					'subcategoria' => array(
							    'cod_subcategoria' => $row['cod_subcategoria'],
							   'titulo_subcategoria' => $row['titulo_subcategoria']
							  )				
				);
			}

			if($rowcount < $postjson['limite']) $scroll = false;
			else $scroll = true;

			if($query) $result = json_encode(array('success'=>true, 'result'=>$dataAnimal, 'scroll'=>$scroll, 'msg'=>''));
			else $result = json_encode(array('success'=>false, 'result'=>$dataAnimal, 'scroll'=>false, 'msg'=>'SQL não executado corretamente'));
		}else{
			$result = json_encode(array('success'=>false, 'result'=>$dataAnimal,  'scroll'=>false, 'msg'=>'Novos registros não encontrados'));
		}
		
		echo $result;

	//----------------------------------------------------------------
	// Informações do Animal - Filtrando por Título e Categoria
	//----------------------------------------------------------------
				
	}else if ($postjson['ask']=='getAnimaisByFilter') {
			
		$dataAnimalFilter = array();
		
		$sqlFilterTitulo = (isset($postjson['filter_titulo']) && $postjson['filter_titulo'] != '') ? " and gen.titulo like '%{$postjson['filter_titulo']}%'  " : " ";
		$sqlFilterCategoria = (isset($postjson['filter_categoria']) && $postjson['filter_categoria'] != 0 ) ? " and gen_cat.cod_categoria = {$postjson['filter_categoria']} " : " ";

		$sqlFilter = " select gen.cod as cod_animal,
				      gen.titulo as nome_animal,
				      gen.foto as foto_animal,
				      gen_cat.cod_categoria as cod_categoria,
				      gen_cat.titulo as titulo_categoria,
				      gen_scat.cod_subcategoria as cod_subcategoria,
				      gen_scat.titulo as titulo_subcategoria
				 from tbl_genetica gen
				   join tbl_genetica_subcategoria gen_scat
					 on (gen_scat.cod_subcategoria = gen.cod_subcategoria)
				   join tbl_genetica_categoria gen_cat
					 on (gen_cat.cod_categoria = gen_scat.cod_categoria)
				 where gen.disponivel = 1 "
				 . $sqlFilterTitulo
				 . $sqlFilterCategoria
                                 .  " order by gen.cod asc
                                 limit " . $postjson['inicio'] . "," . $postjson['limite'] ;	

		$queryFilter = mysqli_query($mysqli, $sqlFilter);
                $rowcountFilter=mysqli_num_rows($queryFilter);

		if ($rowcountFilter > 0){

			while($rowFilter = mysqli_fetch_array($queryFilter)){
	
		                $rowFilter = array_map('utf8_encode', $rowFilter); //tratamento para caracteres especiais não quebrar o retorno do JSON.
	
				$dataAnimalFilter['animais'][] = array(
					'cod_animal' => $rowFilter['cod_animal'],
					'nome_animal' => $rowFilter['nome_animal'],
					'foto_animal' => 'http://www.argen.com.br/arquivos/genetica/970x647_' . $rowFilter['foto_animal'],
					'categoria' => array(
							'cod_categoria' => $rowFilter['cod_categoria'],
							'titulo_categoria' => $rowFilter['titulo_categoria']
							),
					'subcategoria' => array(
							    'cod_subcategoria' => $rowFilter['cod_subcategoria'],
							   'titulo_subcategoria' => $rowFilter['titulo_subcategoria']
							  )				
				);
			}
			
			if($rowcountFilter < $postjson['limite']) $scroll = false;
			else $scroll = true;

			if($queryFilter) $resultFilter = json_encode(array('success'=>true, 'result'=>$dataAnimalFilter, 'scroll'=>$scroll, 'msg'=>''));
			else $resultFilter = json_encode(array('success'=>false, 'result'=>$dataAnimalFilter, 'scroll'=>false, 'msg'=>'SQL não executado corretamente'));
		}else{
			$resultFilter = json_encode(array('success'=>false, 'result'=>$dataAnimalFilter, 'scroll'=>false, 'msg'=>'Novos registros não encontrados'));
		}
		
		echo $resultFilter;
		
	//----------------------------------------------------
	// Informações do Animal
	//----------------------------------------------------
				
	}else if ($postjson['ask']=='getAnimalInfo') {
			
		$dataAnimalInfo  = array();
		
		$sqlInfo = "select gen.titulo as nome_animal,
			       gen.conteudo as info_animal,
			       gen.foto as foto_animal,
			       gen_cat.titulo as titulo_categoria,
			       gen_scat.titulo as titulo_subcategoria
			from tbl_genetica gen
			   join tbl_genetica_subcategoria gen_scat
					on (gen_scat.cod_subcategoria = gen.cod_subcategoria)
			   join tbl_genetica_categoria gen_cat
					on (gen_cat.cod_categoria = gen_scat.cod_categoria)
				where gen.cod = {$postjson['cod_animal']}";		                                 
				 	
		$queryInfo = mysqli_query($mysqli, $sqlInfo);
                $rowcountInfo=mysqli_num_rows($queryInfo);
			
		if ($rowcountInfo > 0){
			while($rowInfo = mysqli_fetch_array($queryInfo)){
	
		                $rowInfo = array_map('utf8_encode', $rowInfo); //tratamento para caracteres especiais não quebrar o retorno do JSON.
	
				$dataAnimalInfo['animal'][] = array(
					'nome_animal' => $rowInfo['nome_animal'],
					'info_animal' => $rowInfo['info_animal'],				
					'foto_animal' => 'http://www.argen.com.br/arquivos/genetica/1600x800_' . $rowInfo['foto_animal'],
					'categoria' => array(
							'titulo_categoria' => $rowInfo['titulo_categoria']
							),
					'subcategoria' => array(
							   'titulo_subcategoria' => $rowInfo['titulo_subcategoria']
							  )		
				);
			}
			if($queryInfo) $resultInfo = json_encode(array('success'=>true, 'result'=>$dataAnimalInfo, 'msg'=>''));
			else $resultInfo = json_encode(array('success'=>false, 'result'=>$dataAnimalInfo, 'msg'=>'SQL não executado corretamente'));
		}else{
			$resultInfo = json_encode(array('success'=>false, 'result'=>$dataAnimalInfo,  'msg'=>'Novos registros não encontrados'));
		}
		
		echo $resultInfo;

	//----------------------------------------------------
	// Informações dos arquivos para Download
	//----------------------------------------------------
	
	}else if ($postjson['ask']=='getAnimalArquivo') {
			
		$dataAnimalArquivo = array();

		$sqlArq = "select gen_arq.titulo as titulo_arquivo,
			       gen_arq.arquivo as url_arquivo
			from tbl_genetica gen
				join tbl_genetica_arquivo gen_arq
					on (gen_arq.cod_group = gen.cod
			  		and gen_arq.disponivel = 1)
				where gen.cod = {$postjson['cod_animal']}";		                                 				
				 	
		$queryArq = mysqli_query($mysqli, $sqlArq);
                $rowcountArq=mysqli_num_rows($queryArq);
			
		if ($rowcountArq > 0){
			while($rowArq = mysqli_fetch_array($queryArq)){
	
		                $rowArq = array_map('utf8_encode', $rowArq); //tratamento para caracteres especiais não quebrar o retorno do JSON.
	
				$dataAnimalArquivo['arquivos'][] = array(
					'titulo_arquivo' => $rowArq['titulo_arquivo'],
					'url_arquivo' => $rowArq['url_arquivo']
				);
			}
			if($queryArq) $resultArq = json_encode(array('success'=>true, 'result'=>$dataAnimalArquivo, 'msg'=>''));
			else $resultArq = json_encode(array('success'=>false, 'result'=>$dataAnimalArquivo, 'msg'=>'SQL não executado corretamente'));
		}else{
			$resultArq = json_encode(array('success'=>false, 'result'=>$dataAnimalArquivo, 'msg'=>'Novos registros não encontrados'));
		}
		echo $resultArq;
		
	//----------------------------------------------------
	// Informações de Outras Fotos do Animal
	//----------------------------------------------------
	
	}else if ($postjson['ask']=='getAnimalFoto') {
			
		$dataAnimalfoto = array();

		$sqlFoto = "select gen_foto.titulo as titulo_foto,
			       gen_foto.arquivo as url_foto
			from tbl_genetica gen
				join tbl_genetica_foto gen_foto
					on (gen_foto.cod_group = gen.cod
			  		and gen_foto.disponivel = 1)
				where gen.cod = {$postjson['cod_animal']}";		                                 				
				 	
		$queryFoto = mysqli_query($mysqli, $sqlFoto);
                $rowcountFoto=mysqli_num_rows($queryFoto);
			
		if ($rowcountFoto > 0){
			while($rowFoto = mysqli_fetch_array($queryFoto)){
	
		                $rowFoto = array_map('utf8_encode', $rowFoto); //tratamento para caracteres especiais não quebrar o retorno do JSON.
	
				$dataAnimalFoto['fotos'][] = array(
					'titulo_foto' => $rowFoto['titulo_foto'],
					'url_foto' => 'http://www.argen.com.br/arquivos/genetica/default_' .  $rowFoto['url_foto']
				);
			}
			if($queryFoto) $resultFoto = json_encode(array('success'=>true, 'result'=>$dataAnimalFoto, 'msg'=>''));
			else $resultFoto = json_encode(array('success'=>false, 'result'=>$dataAnimalFoto, 'msg'=>'SQL não executado corretamente'));
		}else{
			$resultFoto = json_encode(array('success'=>false, 'result'=>$dataAnimalFoto, 'msg'=>'Novos registros não encontrados'));
		}
		echo $resultFoto;
		
	}
   
 ?>   