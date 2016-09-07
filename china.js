var _map = {width: 1925, height: 1110};
var _locale_list = [
    {id: '1001', top: 460, left: 980, name: '北京', title: '北京创新中心', url: 'http://baidu.com'},
    {id: '1002', top: 630, left: 1100, name: '上海', title: '上海创新中心', url: 'http://baidu.com'},
    {id: '1003', top: 827, left: 943, name: '深圳', title: '深圳创新中心', url: 'http://baidu.com'},
    {id: '1004', top: 582, left: 872, name: '西安', title: '西安创新中心', url: 'http://baidu.com'}
];
var _base = {id: 'core', top: 460, left: 980, name: '北京', title: '北京创新中心', url: 'http://baidu.com'};

function refresh_position() {
    var _bg_width = $('#bgmaps').width();
    var _bg_height = $('#bgmaps').height();
    // alert(_bg_width);alert(_bg_height);

    var len = _locale_list.length;
    for (var idx = 0; idx < len; idx++) {
        var _node = _locale_list[idx];
        var _locale_node = $('#_node_' + _node['id']);
        if (_locale_node.length == 0) {
            _locale_node = $('#_base_div').clone();
        }
        _locale_node.attr('id', '_node_' + _node['id']);
        _locale_node.find('.font16').html(_node['name']);

        var _top = _node['top'] / _map['height'] * _bg_height - _locale_node.height() / 2;
        var _left = _node['left'] / _map['width'] * _bg_width - _locale_node.width() / 2;

        _locale_node.offset({top: _top, left: _left});
        $('#wrap_div').append(_locale_node);
        _locale_node.show();
    }
    
    /*
    var tips=new Array();
    tips[0]="1001-双门互锁器设备制作方法"; 				// 北京(1001)提示	: 	双门互锁器设备制作方法
    tips[1]="1002-具有参数存储及汉字显示功能的变频器"; 		// 上海(1002)提示	:	具有参数存储及汉字显示功能的变频器
    tips[2]="1003-成本低的具有二维光子晶体的发光二极管";	// 深圳(1003)提示	:	成本低的具有二维光子晶体的发光二极管
    tips[3]="1004-用在车用喇叭末级放大器上的自制电容";  	// 西安(1004)提示	:	用在车用喇叭末级放大器上的自制电容
    */
    $('#wrap_div > div[id^="_node_"]').each(function(){
    	$this = $(this);
    	var id = $this.attr("id");
    	var id2 = $this.attr('id').split('_')[2];
    	$('#' + id).bind("click", function() { 
        	$('#li_cont-' + id2).show().siblings('li').hide();
        	$('#cont-'+id2).show();
        });
    	
    	
    	/*
        for (var i = 0, len = tips.length; i < len; i++) {
        	var temId = tips[i].split("-")[0];
        	var tip = tips[i].split("-")[1];
        	if (temId == id2 && tip.length > 0) {
        		$this.find("div.tips").show().find("em").text(tip);
        		break;
        	}
        }
        */
    	
    });
}

function repaint_easingline() {
    var _bg_width = $('#bgmaps').width();
    var _bg_height = $('#bgmaps').height();
    // alert(_bg_width);alert(_bg_height);

    // 取得 canvas 元素及其绘图上下文  
    var canvas = document.getElementById('canvas');
    canvas.width = _bg_width;
    canvas.height = _bg_height;

    var _base_top = _base['top'] / _map['height'] * _bg_height;
    var _base_left = _base['left'] / _map['width'] * _bg_width;

    var len = _locale_list.length;
    for (var idx = 0; idx < len; idx++) {
        var _node = _locale_list[idx];
        var _locale_node = $('#_node_' + _node['id']);
        if (_locale_node.length == 0) {
            _locale_node = $('#_base_div').clone();
        }
        _locale_node.attr('id', '_node_' + _node['id']);
        _locale_node.find('.font16').html(_node['name']);

        var _top = _node['top'] / _map['height'] * _bg_height - _locale_node.height() / 2;
        var _left = _node['left'] / _map['width'] * _bg_width - _locale_node.width() / 2;

        _locale_node.offset({top: _top, left: _left});
        $('#wrap_div').append(_locale_node);
        _locale_node.show();

        

        // 画条直线过去
        var context = canvas.getContext('2d');
        _top = _node['top'] / _map['height'] * _bg_height;
        _left = _node['left'] / _map['width'] * _bg_width;
        // 用绝对坐标来创建一条路径
        context.beginPath();
        context.fillStyle = "#00ccff";
        context.setLineDash([1, 2]);
        context.moveTo(_base_left, _base_top);
        context.lineTo(_left, _top);
        context.closePath();
        context.fill();
        context.strokeStyle = "#00ccff";
        // 将这条线绘制到 canvas 上
        context.stroke();
    }
    
  
    
    
}


$(document).ready(function() {
    refresh_position();
    // repaint_easingline();
    $('.cj-cont').hide();
    $('#cont-1001').show();

    $(window).resize(function() {
        refresh_position();
        // repaint_easingline();
    });


});