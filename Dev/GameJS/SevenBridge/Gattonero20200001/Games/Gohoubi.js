/*
	GohoubiMain
*/

function* <generatorForTask> GohoubiMain()
{
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		SetColor("#808000");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#ffff00");
		SetFSize(60);
		SetPrint(100, 200, 150);

		PrintLine("������ �N���A��� ������");
		PrintLine("(����łɂ�������)");
		PrintLine("��ʂ��^�b�v���ĉ������B");
		PrintLine("�ŏ��̉�ʂɖ߂�܂��B");

		yield 1;
	}
	FreezeInput();
}
