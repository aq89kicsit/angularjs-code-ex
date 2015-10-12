var app = angular.module('grep',[]);
app.controller('showSearchedText',function($scope,$filter){
    $scope.item = '';

    function getItemList(){
        var data = $filter('json')($scope.item);    // ctext string
        var items = data.split("\n");   //line by line (get all lines)
        var jItemList = [];
        for(var i = 0; i < items.length; i++){
            var item = { "jNumber" : i + 1, "jContent" : items[i] };
            jItemList.push(item);
        }
        //console.log(data);
        console.log(jItemList);

        return jItemList;
    }

    $scope.jsonDataChange = function(){
        $scope.itemList = getItemList();
    }

    $scope.results = [];
    $scope.findValue = function(){
        console.log($scope.searchString);
        if($scope.searchString ===  null || $scope.searchString === ""){
            $scope.itemList = getItemList();    // i know here one thing :)
        }else{
            var isCaseSestive = $scope.case_sestive;  //if checked (true) if not undefined
            var isGenFit = $scope.general_fit;

            $scope.results = [];
            $scope.itemList = getItemList();
            angular.forEach($scope.itemList,function(value, key){
                if (isCaseSestive) {
                    if (value.jContent.indexOf($scope.searchString) > -1) {
                        $scope.results.push({ "jNumber": value.jNumber, "jContent": value.jContent });
                    }
                } else {
                    if (value.jContent.toLowerCase().indexOf($scope.searchString.toLowerCase()) > -1) {
                        $scope.results.push({ "jNumber": value.jNumber, "jContent": value.jContent });
                    }
                }
            });
            $scope.itemList = $scope.results;
        }

    };

});

angular.module("grep").directive("myDirective", function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function (data) {
                //convert data from view format to model format
                // Json check start
                if (data === "" || data === null || data === undefined) {
                    return [];
                }
                var j_temp = JSON.parse(data);

                // Handle non-exception-throwing cases:
                // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
                // but... JSON.parse(null) returns 'null', and typeof null === "object",
                // so we must check for that, too.
                if (j_temp && typeof j_temp === "object" && j_temp !== null) {
                    //console.log(j_temp);
                }
                //console.log(j_temp.length);
                // Json check ends

                // format the unorders json string
                var bf_string = JSON.stringify(j_temp, null, 4);    // beautifull format json string
                //return JSON.stringify(j_temp, null, 4);
                //now map all the new lines to every index

                var count = 0;
                angular.forEach(j_temp, function (item) {
                    //console.log(item);
                    count++;
                })
                console.log(count);
                //console.log(Object.keys(j_temp).length);
                //return j_temp.length;    // this is the length before beautifully format
                //return bf_string.length;    // this is the length after beautifully format
                return j_temp; //converted
            });

        }
    };
});