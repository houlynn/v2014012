Ext.define('core.app.module.factory.ModelFactory', {
	statics : {
		getModelByModule : function(module,apiConfig) {
			var api={
						read : 'rest/module/fetchdata.do',
						update : 'rest/module/update.do',
						create : 'rest/module/create.do',
						destroy : 'rest/module/remove.do'
			};
			if(apiConfig){
				Ext.apply(api,apiConfig);
			}
			var model = Ext.define('app.model.' + module.tf_moduleName, {
				extend : 'Ext.data.Model',
				module : module,
				idProperty : module.tf_primaryKey,//主键
				nameFields : module.tf_nameFields,//唯一标示
				titleTpl : module.tf_titleTpl,//标题模板
				titleTemplate : null,
				fields : this.getFields(module),//属性
				proxy : {
					type : 'rest',
					batchActions : true,
				    isSynchronous: true,
					extraParams : {
						moduleName : module.tf_moduleName
					},
					api : api,
					actionMethods : {
						create : 'POST',
						read : 'GET',
						update : 'PUT',
						destroy : 'DELETE'
					},
					reader : {
						type : 'json',
						root : 'records',
						totalProperty : 'totalCount'
					},
					writer : {
						type : 'json',
						writeRecordId : true,
						writeAllFields : false
					},
		
					listeners : {
						exception : function(proxy, response, operation) {
							var  errorInfo = Ext.decode(response.responseText, true);
							   proxy.errorInfo=errorInfo;
							   var resutlCode=errorInfo.errorInfo.resultCode;
							   alert(resutlCode);
							    switch(resutlCode){
							    case 300:{
							    	system.warnInfo(errorInfo.errorInfo.errorMessage.error,"警告");
							    	break;
							    }
							    default:{
							    	  system.errorAlertInfo(errorInfo.errorInfo.errorMessage.error,"错误提示");
							    }
							    }
							 
						}
					}
				},

				getTitleTpl : function() {
					if (!this.titleTemplate) {
						if (this.titleTpl)
							this.titleTemplate = new Ext.Template(this.titleTpl);
						else
							this.titleTemplate = new Ext.Template('{' + this.nameFields + '}');
					}
					return this.titleTemplate.apply(this.getData())
				},

				// 此条记录是否可以修改
				canEdit : function() {
					if (this.module.tf_hasAuditing && this.get('tf_auditinged'))
						return false;
					if (this.module.tf_hasApprove && this.get('tf_shNowCount') > 0)
						return false;
					return true;
				},

				// 此条记录是否可以进行操作
				canOperate : function() {
					if (this.module.tf_hasAuditing && this.get('tf_auditinged'))
						return false;
					return true;
				},

				// 此条记录是否可以删除
				canDelete : function() {
					if (this.module.tf_hasAuditing && this.get('tf_auditinged'))
						return {
							canDelete : false,
							message : '【' + this.getTitleTpl() + '】已进行过审核，不允许进行删除操作!'
						};
					if (this.module.tf_hasApprove && this.get('tf_shNowCount') > 0)
						return {
							canDelete : false,
							message : '【' + this.getTitleTpl() + '】正在审批或已经审批完成,不允许进行删除操作!'
						};
					return true;
				},

				// 取得主键值
				getIdValue : function() {
					return this.get(this.idProperty);
				},

				// 取得当前记录的名字字段
				getNameValue : function() {
					if (this.nameFields)
						return this.get(this.nameFields);
					else
						return null;
				}

			});
			return model;
		},
		
		getFields : function(module) {
			var fields = [];
			for (var i in module.tf_fields) {
		
				var fd = module.tf_fields[i];
				var field = {
					name : fd.tf_fieldName,
					title : fd.tf_title,
					type : this.getTypeByStr(fd.tf_fieldType)
				};
				
				if (field.type == 'string') {
					field.useNull = true;
					field.serialize = this.convertToNull;
				}
				
				if (fd.tf_fieldType == 'Date') {
					field.dateWriteFormat = 'Y-m-d';
					field.dateReadFormat = 'Y-m-d';
				}
				
				if (fd.tf_fieldType == 'Datetime'){
					field.dateReadFormat = 'Y-m-d H:i:s';
			     }
			 
			  if(fd.manyToOne==true){
				  field.type="string";
				  var modue=system.getModuleDefine(fd.tf_fieldType);
				  field.manytoone_IdName="_"+modue.tf_moduleId+"___"+modue.tf_primaryKey;
				  field.manytoone_TitleName="_"+modue.tf_moduleId+"___"+modue.tf_nameFields;
			     }
				field.tf_haveAttachment = fd.tf_haveAttachment;
				fields.push(field);
			}
			    return fields;

		},

		getTypeByStr : function(str) {
			console.log(str);
			switch (str) {
				case 'String' :
					return 'string';
				case 'Boolean' :
					return 'boolean';
				case 'Integer' :
					return 'int';
				case 'Date' :
					return 'date';
				case 'Datetime' :
					return 'date';
				case 'Double' :
					return 'double';
				case 'Money' :
				case 'Percent' :
					return 'float';
				default :
					return 'string';
			}
		},

		convertToNull : function(v) {
			return v ? v : null;
		}

	}

});
