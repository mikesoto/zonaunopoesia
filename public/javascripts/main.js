$(document).ready(function(){
        if($(".secondary")){
                var sidebarHeight = $(".secondary").height();
                var primaryHeight = $(".primary").height();
                if(sidebarHeight > primaryHeight){
                        $(".primary").height(sidebarHeight);
                }else{
                        $(".secondary").height(primaryHeight);
                }
        }
});
