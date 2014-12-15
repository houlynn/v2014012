Ext.define("core.bl.deptimg.view.DeptImageUrlPanel",{
	extend:"core.app.base.BasePanel",
	alias:"widget.bl.deptImageUrlPanel",
	funCode:"deptImageUrl_main",
	funData:{
	        action:"/bl/deptimg", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"id",
	        modelName:"org.yingqu.baoli.model.DeptImageUrl",//实体全路径
	        tableName:"DeptImageUrl",//表名
	        defaultObj:{enabled:"1"},//默认信息，用于表格添加的时候字段默认值
	        isChildren:true,//是否子功能
	        parentCode:"department_main",//主功能功能编码
	        connectFields:[{//关联字段
			mainFieldCode:"deptId",//主功能字段名
			childFieldCode:"dept",//子功能字段名
			foreignKey:"foreignKey",//外键虚字段
			isQuery:true
			}]
	},
		items:[{
			xtype:"bl.deptImageUrlGrid",
			region:"center"
		}]
});