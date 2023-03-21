/*
	�ݒ�
*/

function* <generatorForTask> SettingMain()
{
	var<int> selectIndex = 0;

	FreezeInput();

gameLoop:
	for (; ; )
	{
		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(70, 170, 50);
		SetFSize(40);
		PrintLine("�ݒ�");

		selectIndex = DrawSimpleMenu(
			selectIndex,
			70,
			200,
			600,
			30,
			[
				"���y�̉���",
				"���ʉ��̉���",
				"�Q�[���p�b�h�F�y�L�[�̊��蓖�ĕύX",
				"�Q�[���p�b�h�F�w�L�[�̊��蓖�ĕύX",
				"�Q�[���p�b�h�F�X�y�[�X�L�[�̊��蓖�ĕύX",
				"�f�[�^�̏���",
				"�߂�",
			]);

		if (DSM_Desided)
		switch (selectIndex)
		{
		case 0:
			yield* @@_VolumeSetting("���y", MusicVolume, DEFAULT_MUSIC_VOLUME, function <void> (<double> volume)
			{
				MusicVolume = volume;
				MusicVolumeChanged();
				SaveLocalStorage();
			});
			break;

		case 1:
			yield* @@_VolumeSetting("���ʉ�", SEVolume, DEFAULT_SE_VOLUME, function <void> (<double> volume)
			{
				SEVolume = volume;
				SaveLocalStorage();
			});
			break;

		case 2:
			yield* @@_PadSetting("�y", index => PadInputIndex_A = index);
			break;

		case 3:
			yield* @@_PadSetting("�w", index => PadInputIndex_B = index);
			break;

		case 4:
			yield* @@_PadSetting("�X�y�[�X", index => PadInputIndex_Pause = index);
			break;

		case 5:
			yield* @@_RemoveSaveData();
			break;

		case 6:
			break gameLoop;
		}
		yield 1;
	}
	FreezeInput();
}

function* <generatorForTask> @@_VolumeSetting(<string> name, <double> initVolume, <double> defaultVolume, <Action double> volumeChanged)
{
	FreezeInput();

	var<int> volume = ToInt(initVolume * 100.0);

	for (var<int> frame = 0; ; frame++)
	{
		if (frame % 60 == 0)
		{
			SE(ChooseOne(S_�e�X�g�p));
		}

		if (GetMouseDown() == -1 || GetKeyInput(32) == 1)
		{
			break;
		}

		var<boolean> changed = false;

		if (IsPound(GetInput_2()))
		{
			volume -= 10;
			changed = true;
		}
		if (IsPound(GetInput_4()))
		{
			volume--;
			changed = true;
		}
		if (IsPound(GetInput_6()))
		{
			volume++;
			changed = true;
		}
		if (IsPound(GetInput_8()))
		{
			volume += 10;
			changed = true;
		}
		if (GetInput_B() == 1)
		{
			volume = defaultVolume * 100.0;
			changed = true;
		}
		if (GetInput_A() == 1)
		{
			break;
		}

		if (changed)
		{
			volume = ToRange(volume, 0, 100);
			volumeChanged(volume / 100.0);
		}

		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(100, 280, 50);
		SetFSize(20);
		PrintLine(name + "�̉��ʐݒ� ( ���݂̉��� = " + volume + " )");
		PrintLine("��E�E�L�[�@�ˁ@���ʂ��グ��");
		PrintLine("���E���L�[�@�ˁ@���ʂ��グ��");
		PrintLine("�w�L�[�@�@�@�ˁ@�����l�ɖ߂�");
		PrintLine("�y�L�[�@�@�@�ˁ@�߂�");
		PrintLine("���j���[�ɖ߂�ɂ̓X�y�[�X�L�[�܂��͉�ʂ��N���b�N���ĉ������B");

		yield 1;
	}
	FreezeInput();
}

function* <generatorForTask> @@_PadSetting(<string> name, <Action int> a_setBtn)
{
	yield* WaitToReleaseButton();
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1 || GetKeyInput(32) == 1)
		{
			break;
		}

		var<int> index = @@_GetPressButtonIndex();

		if (index != -1)
		{
			a_setBtn(index);
			SaveLocalStorage();
			break;
		}

		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(100, 360, 50);
		SetFSize(20);
		PrintLine("�Q�[���p�b�h�́u" + name + "�L�[�v�ݒ�");
		PrintLine("�u" + name + "�L�[�v�����蓖�Ă�{�^���������ĉ������B");
		PrintLine("�L�����Z������ɂ̓X�y�[�X�L�[�܂��͉�ʂ��N���b�N���ĉ������B");

		yield 1;
	}
	yield* WaitToReleaseButton();
	FreezeInput_Frame(2); // ����{�^�����ύX�����ƃ��j���[�ɖ߂������A���������o���Ă��܂��B-- frame 1 -> 2
}

function <int> @@_GetPressButtonIndex()
{
	for (var<int> index = 0; index < 100; index++)
	{
		if (1 <= GetPadInput(index))
		{
			return index;
		}
	}
	return -1;
}

function* <generatorForTask> @@_RemoveSaveData()
{
	var<int> selectIndex = 0;

	FreezeInput();

gameLoop:
	for (; ; )
	{
		SetColor("#a0b0c0");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(100, 320, 50);
		SetFSize(20);
		PrintLine("�Z�[�u�f�[�^�����S�ɏ������܂��B�X�����ł����H");

		selectIndex = DrawSimpleMenu(
			selectIndex,
			70,
			350,
			600,
			30,
			[
				"�͂�",
				"������",
			]);

		if (DSM_Desided)
		switch (selectIndex)
		{
		case 0:
			ClearLocalStorageValue();
			LoadLocalStorage();
			SE(S_SaveDataRemoved);
			break gameLoop;

		case 1:
			break gameLoop;
		}
		yield 1;
	}
	FreezeInput();
}
