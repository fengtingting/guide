var _map = {width: 1925, height: 1110};
var _locale_list = [
    {id: '1001', top: 520, left: 1225, name: '中国', title: '北京创新中心', url: 'http://www.cecb2b.com/guide/china.html'},
    {id: '1002', top: 540, left: 320, name: '美国', title: '硅谷创新中心', url: 'http://baidu.com'},
    {id: '1003', top: 475, left: 760, name: '德国', title: '德国创新中心', url: 'http://baidu.com'},
    {id: '1004', top: 360, left: 1185, name: '俄罗斯', title: '俄罗斯创新中心', url: 'http://baidu.com'},
    {id: '1005', top: 580, left: 880, name: '以色列', title: '以色列创新中心', url: 'http://baidu.com'}//,
    //{id: '1006', top: 380, left: 785, name: '瑞典', title: '瑞典创新中心', url: 'http://baidu.com'}
];
var _base = {id: 'core', top: 520, left: 1225, name: '北京', title: '北京创新中心', url: 'http://baidu.com'};

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
    
    
    
    
    var tips = [
        {id: '1002', info: '测量过程流体的压力变送器', url: 'http://www.cecb2b.com/solution/index.php?r=project-info%2Ftech&id=5534333'},	// 美国(1002)提示	: 	测量过程流体的压力变送器
        {id: '1003', info: '移动设备电池隔离保护专利', url: 'http://www.cecb2b.com/solution/index.php?r=project-info%2Ftech&id=5534334'},	// 德国(1003)提示	:	移动设备电池隔离保护专利
        {id: '1004', info: '全景视频监控观测装置', url: 'http://www.cecb2b.com/solution/index.php?r=project-info%2Ftech&id=5534328'},		// 俄罗斯(1004)提示	:	全景视频监控观测装置
        {id: '1005', info: '网络智能机人工智能程序', url: 'http://www.cecb2b.com/solution/index.php?r=project-info%2Ftech&id=5534327'}		// 以色列(1005)提示	:	网络智能机人工智能程序
    ];
    
    $('#wrap_div > div[id^="_node_"]').each(function(){
    	$this = $(this);
    	var id = $this.attr("id");
    	
    	var id2 = $this.attr('id').split('_')[2];
    	$('#' + id).bind("click", function() { 

        	if (1001 == id2) {
        		window.location.href="http://www.cecb2b.com/guide/china.html";
        	}
    		
        	$('#li_cont-' + id2).show().siblings('li').hide();
        	$('#cont-'+id2).show();
        });
    	
    	
        for (var i = 0, len = tips.length; i < len; i++) {
        	var tip = tips[i];
        	var temId = tip['id'];
        	
        	if (temId == id2) {
        		var html = "<a class='colorf' style='display:inline-block;' target='_blank' href='"+tip['url']+"'>"+ tip['info'] +"</a>";
        		$this.find("div.tips").show().find("em").html(html);
        		break;
        	}
        }
    	
    });
    
    
}


$(document).ready(function() {
    // refresh_position();
    repaint_easingline();
    $('.cj-cont').hide();
    $('#cont-1001').show();

    $(window).resize(function() {
        // refresh_position();
        repaint_easingline();
    });

});