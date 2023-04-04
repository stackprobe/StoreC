package mains.test20230319;

import java.io.File;

import charlotte.commons.SCommon;

public class Test0003 {
	public static void main(String[] args) {
		try {
			test01();
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private static void test01() {
		SCommon.copyDir(new File("C:/temp/Input"), new File("C:/temp/Output"));
	}
}
