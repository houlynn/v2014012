Ext.define('core.app.view.basis.BaseForm', {
		extend : 'Ext.container.Container',
        funCode:"basisPanel",
	    funData:{
	        action:"/bl/mesg", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"msgid",
	        modelName:"org.yingqu.baoli.model.Massage",//实体全路径
	        tableName:"Massage",//表名
	        defaultObj:{enabled:"1"},//默认信息，用于表格添加的时候字段默认值
	        isChildren:false,//是否子功能
	        children:[{//子功能的配置
	        	funCode:"massageitem_main"	        	
	        }],
	        //子功能信息
	        childFun:[],
	        parentCode:"massage_main",//主功能功能编码
	        connectFields:[{//关联字段
			mainFieldCode:"",//主功能字段名
			childFieldCode:"",//子功能字段名
			foreignKey:"foreignKey",//外键虚字段
			isQuery:true
			}]
	},