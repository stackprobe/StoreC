/*
	アプリケーション用メインモジュール
*/

setTimeout(@@_Main, 0);

function <void> @@_Main()
{
	@@_Loading();
}

function <void> @@_Loading()
{
	if (1 <= Loading)
	{
		PrintGameLoading();
		setTimeout(@@_Loading, 100);
	}
	else
	{
		PrintGameLoaded();
		@@_Loaded();
	}
}

function <void> @@_Loaded()
{
	ProcMain(@@_Main2());
}

function* <generatorForTask> @@_Main2()
{
	if (DEBUG)
	{
		// -- choose one --

//		yield* Test01();
//		yield* Test02();
//		yield* Test03();
		yield* @@_Main3();

		// --
	}
	else
	{
		yield* @@_Main3();
	}
}

function* <generatorForTask> @@_Main3()
{
	yield* EntranceMain();
}
