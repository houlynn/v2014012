Ext.define("core.store.purchase.view.PurchaseItemPanel",{
	extend:"core.app.base.BasePanel",
	alias:"widget.store.purchaseItemPanel",
	funCode:"purchaseItem_main",
	funData:{
	        action:"/store/purchaseItem", //请求Action
	        whereSql:"",//表格查询条件
	        orderSql:"operatingTime",//表格排序条件
	        pkName:"pchitItem",
	        modelName:"org.yingqu.Purchase.model.PurchaseItem",//实体全路径
	        tableName:"PurchaseItem",//表名
	        defaultObj:{enabled:"1"},//默认信息，用于表格添加的时候字段默认值
	        isChildren:true,//是否子功能
	        parentCode:"purchaseContent_main",//主功能功能编码
	        connectFields:[{//关联字段
			mainFieldCode:"purid",//主功能字段名
			childFieldCode:"purchid",//子功能字段名
			foreignKey:"foreignKey",//外键虚字段
			isQuery:true
			}]
	},
		items:{
			xtype:"store.purchaseItemGrid",
			region:"center"
		}
});