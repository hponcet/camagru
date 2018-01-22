<?php
  class toolBox
  {
    public function filesByExtensionIntoDir ($path, $extension){
      if ($fd = opendir($path)){
        while (($file = readdir($fd)) !== false){
          if ($file !== ".." && $file !== "." && pathinfo($file)['extension'] == $extension) {
            $tableRet[] = $path."/".$file;
          }
        }
      }
      closedir($fd);
      return $tableRet;
    }
  }
  $tools = new toolBox;
?>
