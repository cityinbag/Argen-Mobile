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
	// Lista de todas os Empresas - Sem filtro
	//----------------------------------------------------

	if ($postjson['ask']=='getEmpresas') {
			
		$dataEmp = array();
		//$sql = " select cod, titulo, foto from tbl_genetica order by cod limit $postjson[start], $postjson[limit] ";
		
		$sqlEmp = " select emp.cod_empresa as cod_empresa,
		                emp.nome_empresa as nome_empresa,
				emp.cnpj_empresa as cnpj_empresa
			 from tbl_empresa emp
			 order by emp.nome_empresa asc 
                         limit " . $postjson['inicio'] . "," . $postjson['limite'] ;		                                 
				 
	
		$queryEmp = mysqli_query($mysqli, $sqlEmp);
                
                $rowcountEmp=mysqli_num_rows($queryEmp);
			
		if ($rowcountEmp > 0){
			while($rowEmp = mysqli_fetch_array($queryEmp)){
	
		                $rowEmp = array_map('utf8_encode', $rowEmp); //tratamento para caracteres especiais não quebrar o retorno do JSON.
	
				$dataEmp[] = array(
					'cod_empresa' => $rowEmp['cod_empresa'],
					'nome_empresa' => $rowEmp['nome_empresa'],
					'cnpj_empresa' => $rowEmp['cnpj_empresa']				
				);
			}

			if($queryEmp) $resultEmp = json_encode(array('success'=>true, 'result'=>$dataEmp, 'rows'=>$rowcountEmp, 'msg'=>''));
			else $resultEmp = json_encode(array('success'=>false, 'result'=>$dataEmp, 'rows'=>$rowcountEmp, 'msg'=>'SQL não executado corretamente'));
		}else{
			$resultEmp = json_encode(array('success'=>false, 'result'=>$dataEmp, 'rows'=>0, 'msg'=>''));
		}
		
		echo $resultEmp;

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
			
			if($queryFilter) $resultFilter = json_encode(array('success'=>true, 'result'=>$dataAnimalFilter, 'rows'=>$rowcountFilter, 'msg'=>''));
			else $resultFilter = json_encode(array('success'=>false, 'result'=>$dataAnimalFilter, 'rows'=>$rowcountFilter, 'msg'=>'SQL não executado corretamente'));
		}else{
			$resultFilter = json_encode(array('success'=>false, 'result'=>$dataAnimalFilter, 'rows'=>0, 'msg'=>''));
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
	// Adicionar nova Empresa
	//----------------------------------------------------
	
	}else if ($postjson['ask']=='addEmpresa') {
			
		$dataAddEmp = array();

		$sqlAdEmp = "insert into tbl_empresa (nome_empresa, cnpj_empresa) values (?, ?)";		                                 				
				 	
		if ($stmtAdEmp = $mysqli->prepare($sqlAdEmp )) {
		    $stmtAdEmp->bind_param("ss", $postjson['nome_empresa'], $postjson['cnpj_empresa']);
		    $stmtAdEmp->execute();
		}

		$msg_error = mysqli_error($mysqli);

		if($stmtAdEmp){
			if($msg_error == ''){
                        	$last_id = $mysqli->insert_id;		
				$dataAdEmpresa['empresa'] = array(
							'cod_empresa' => $last_id ,
							'nome_empresa' => $postjson['nome_empresa'], 
							'cnpj_empresa' => $postjson['cnpj_empresa']
				);
				
				$resultAdEmp = json_encode(array('success'=>true, 'result'=>$dataAddEmp, 'msg'=>''));				
			}
			elseif(strpos($msg_error , "uk_cnpj") == true){
				$resultAdEmp = json_encode(array('success'=>false, 'result'=>$dataAddEmp, 'msg'=>'CNPJ já cadastrado.'));								
			}
			else{
				$resultAdEmp = json_encode(array('success'=>false, 'result'=>$dataAddEmp, 'msg'=>$msg_error));				
			}
		}else{
			$resultAdEmp = json_encode(array('success'=>false, 'result'=>$dataAddEmp, 'msg'=>$msg_error));
		}

		echo $resultAdEmp;
		
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