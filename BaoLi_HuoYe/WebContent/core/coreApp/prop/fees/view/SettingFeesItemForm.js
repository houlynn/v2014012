Ext.define('core.prop.fees.view.SettingFeesItemForm', {
		    extend : "Ext.form.Panel",
			alias : 'widget.fees.feesitemform',
		    buttonAlign : 'center',
			initComponent : function() {
				var me = this;
				this.buttons = [];
				var self=this;
				this.buttons.push({
							text : '保存',
							itemId : 'save',
							glyph : 0xf0c7
						},{
							text : '关闭',
							itemId : 'close',
							glyph : 0xf148,
							handler : function(button){
								button.up('window').hide();
							}
						});
						me.callParent(arguments);
			},
			  items: [
                      {
                    	 xtype: "moduecombobox", name: "itemId",
                    	 fieldLabel: "收费标准",
                    	 flex: 1, allowBlank : false,
                    	 itemId : 'feeeItemCombobox', ddCode :{
                         modeuName:"FeesInfo",
                         marking:'1',
                         identification:'1',
                         allowBlank : false,
                      }}
                  ]
			
			
		});
