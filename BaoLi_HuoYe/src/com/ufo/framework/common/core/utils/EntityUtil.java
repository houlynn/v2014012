package com.ufo.framework.common.core.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Collection;

import com.ufo.framework.common.model.Model;
public class EntityUtil  {
	/**
	 * 根据实体名称获取Class对象
	 * @param className
	 * @return
	 */
	public static Class<?> getClassByName(String className){
		Class<?> clazz=null;
		try {
			clazz=Class.forName(className);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return clazz;
	}
	/**
	 * 执行指定类的方法
	 * @param owner
	 * @param methodName
	 * @param args
	 * @return
	 */
	public static Object invokeMethod(Object owner, String methodName,Object[] args){
		Class<?> ownerClass=owner.getClass();
		Class<?>[] argsClass=null;
		if(args!=null){
			argsClass=new Class<?>[args.length];
			for(int i=0;i<args.length;i++){
				if(args[i]!=null){
					if("java.lang.Bollean".equals(args[i].getClass())){
						argsClass[i]=boolean.class;
					}else{
						argsClass[i]=args[i].getClass();
					}
				}else{
					argsClass[i]=Object.class;
				}
			}
		}
		Method method=null;
		try {
			       method=ownerClass.getMethod(methodName, argsClass);
			      
			       System.out.println("打印方法名:"+methodName+": 方法"+method);
			
		} catch (Exception e) {
			e.printStackTrace();
			// TODO Auto-generated catch block
			System.out.println("68 :获取类函数失败");
		}
		Object obj=null;
		try {
			obj=method.invoke(owner, args);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO Auto-generated catch block
			//System.out.println("执行"+ownerClass.getName()+"类中的"+method.getName()+"函数失败");
		}
		return obj;
	}
	/**
	 * 
	 * 执行属性的set方法
	 * @param model
	 * @param keyName
	 * @param args
	 */
	public static void invokeSetMethod(Object model,String keyName,Object[] args){
		String setMethodName="set"+keyName.substring(0,1).toUpperCase()+keyName.substring(1);
		System.out.println("调用"+ setMethodName);
		invokeMethod(model, setMethodName, args);
		System.out.println("调用set方法");
	}
	/**
	 * 执行属性的get方法
	 * @param model
	 * @param proName
	 * @return
	 */
	public static Object getPropertyValue(Object model, String proName){
		String getMethodName="get"+proName.substring(0,1).toUpperCase()+proName.substring(1);
		System.out.println("99调用方法："+ getMethodName);
		Object obj=invokeMethod(model, getMethodName, null);
		System.out.println("110调用方法："+ getMethodName+"调用成功!");
		return obj;
	}
	public static Object copyNewField(Object obj,Object entity){
		Field[] fields=ModelUtil.getClassFields(entity.getClass(), false);
		for(Field f:fields){
			if(!f.getName().endsWith("serialVersionUID"))
			{
			Object value=getPropertyValue(entity,f.getName());
				if(value!=null && !(value instanceof Model) && !(value instanceof Collection)){
					invokeSetMethod(obj, f.getName(), new Object[]{value});
				}else if(value!=null && value instanceof Model){
					String pkName=ModelUtil.getClassPkName(value.getClass());
					String sid=(String) getPropertyValue(value, pkName);
					if(StringUtil.isNotEmpty(sid)){
						invokeSetMethod(obj, f.getName(), new Object[]{value});
					}
				}
			}
		}
		return obj;
	}

}
