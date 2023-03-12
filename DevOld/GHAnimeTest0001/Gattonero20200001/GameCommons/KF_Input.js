/*
	����

	�t�@�C���� Input.js -> KF_Input.js �̗��R�F
	�{�\�[�X�� *_EACH() �� Gamepad.js, Keyboard.js �� *_EACH ����Ɏ��s����K�v������B
*/

/*
	�Q�[���p�b�h�̃{�^���E�C���f�b�N�X
	�ύX�\
*/
var<int> PadInputIndex_2 = 102;
var<int> PadInputIndex_4 = 104;
var<int> PadInputIndex_6 = 106;
var<int> PadInputIndex_8 = 108;
var<int> PadInputIndex_A = 0;
var<int> PadInputIndex_B = 3;
var<int> PadInputIndex_Pause = 9;

/*
	�e�{�^���̉�����ԃJ�E���^
*/
var<int> @@_Count_2 = 0;
var<int> @@_Count_4 = 0;
var<int> @@_Count_6 = 0;
var<int> @@_Count_8 = 0;
var<int> @@_Count_A = 0;
var<int> @@_Count_B = 0;
var<int> @@_Count_Pause = 0;

/*
	�e�{�^���̉�����ԃJ�E���^�̗�
*/
function* <int[]> @@_Counts()
{
	yield @@_Count_2;
	yield @@_Count_4;
	yield @@_Count_6;
	yield @@_Count_8;
	yield @@_Count_A;
	yield @@_Count_B;
	yield @@_Count_Pause;
}

function <void> @(UNQN)_EACH()
{
	@@_Count_2     = @@_Check(@@_Count_2,     false,           PadInputIndex_2,     [ 40,  98, 83 ]); // �J�[�\���� , �e���L�[2 , S
	@@_Count_4     = @@_Check(@@_Count_4,     false,           PadInputIndex_4,     [ 37, 100, 65 ]); // �J�[�\���� , �e���L�[4 , A
	@@_Count_6     = @@_Check(@@_Count_6,     1 <= @@_Count_4, PadInputIndex_6,     [ 39, 102, 68 ]); // �J�[�\���E , �e���L�[6 , D
	@@_Count_8     = @@_Check(@@_Count_8,     1 <= @@_Count_2, PadInputIndex_8,     [ 38, 104, 87 ]); // �J�[�\���� , �e���L�[8 , W
	@@_Count_A     = @@_Check(@@_Count_A,     false,           PadInputIndex_A,     [ 90 ]); // Z
	@@_Count_B     = @@_Check(@@_Count_B,     false,           PadInputIndex_B,     [ 88 ]); // X
	@@_Count_Pause = @@_Check(@@_Count_Pause, false,           PadInputIndex_Pause, [ 32 ]); // �X�y�[�X
}

function <int> @@_Check(<int> counter, <boolean> oppositeInput, <int> padInputIndex, <int[]> keyCodes)
{
	var<boolean> statusPad = GetPadInput(padInputIndex);
	var<boolean> statusKey = false;

	for (var<int> keyCode of keyCodes)
	{
		if (1 <= GetKeyInput(keyCode))
		{
			statusKey = true;
		}
	}
	var<boolean> status = !oppositeInput && (statusPad || statusKey);

	if (status) // ? �����Ă���B
	{
		// �O�� �� ����
		// -2   �� -2
		// -1   ��  1
		//  0   ��  1
		//  1�` ��  2�`

		if (counter != -2)
		{
			counter = Math.max(counter + 1, 1);
		}
	}
	else // ? �����Ă��Ȃ��B
	{
		// �O�� �� ����
		// -2   ��  0
		// -1   ��  0
		//  0   ��  0
		//  1�` �� -1

		counter = Math.max(Math.max(counter, 0) * -1, -1);
	}
	return counter;
}

function <int> @@_GetInput(<int> counter)
{
	return 1 <= FreezeInputFrame || counter == -2 ? 0 : counter;
}

// ������ �{�^���E�L�[������ 1 �}�E�X������ -1 �Ŕ��肷��B

// ----
// GetInput_X ��������
// ----

function <int> GetInput_2()
{
	return @@_GetInput(@@_Count_2, true);
}

function <int> GetInput_4()
{
	return @@_GetInput(@@_Count_4, true);
}

function <int> GetInput_6()
{
	return @@_GetInput(@@_Count_6, true);
}

function <int> GetInput_8()
{
	return @@_GetInput(@@_Count_8, true);
}

/*
	Z
	����
	�W�����v
	etc.
*/
function <int> GetInput_A()
{
	return @@_GetInput(@@_Count_A, false);
}

/*
	X
	�L�����Z��
	�U��
	etc.
*/
function <int> GetInput_B()
{
	return @@_GetInput(@@_Count_B, false);
}

/*
	�X�y�[�X
	�|�[�Y
	etc.
*/
function <int> GetInput_Pause()
{
	return @@_GetInput(@@_Count_Pause, false);
}

// ----
// GetInput_X �����܂�
// ----

/*
	�L�[��{�^���̉������ςȂ���A�łƂ��Č��o����B

	�g�p��F
		if (IsPound(GetInput_A()))
		{
			// ...
		}
*/
function <boolean> IsPound(<int> counter)
{
	var<int> POUND_FIRST_DELAY = 17;
	var<int> POUND_DELAY = 4;

	return counter == 1 || POUND_FIRST_DELAY < counter && (counter - POUND_FIRST_DELAY) % POUND_DELAY == 1;
}

// ���͗}�~�t���[����
var<int> FreezeInputFrame = 0;

function @(UNQN)_EACH()
{
	FreezeInputFrame = CountDown(FreezeInputFrame);
}

function <void> FreezeInput_Frame(<int> frame) // frame: 1 == ���̃t���[���̂�, 2 == ���̃t���[���Ǝ��̃t���[�� ...
{
	ClearMouseDown();
	FreezeInputFrame = Math.max(FreezeInputFrame, frame); // frame ��蒷���t���[���������ɐݒ肳��Ă�����A�������D�悷��B
}

function <void> FreezeInput()
{
	FreezeInput_Frame(1);
}

function <void> FreezeInputUntilRelease()
{
	var<int> COUNT_FREEZE_INPUT = -2;

//	@@_Count_2     = COUNT_FREEZE_INPUT;
//	@@_Count_4     = COUNT_FREEZE_INPUT;
//	@@_Count_6     = COUNT_FREEZE_INPUT;
//	@@_Count_8     = COUNT_FREEZE_INPUT;
	@@_Count_A     = COUNT_FREEZE_INPUT;
	@@_Count_B     = COUNT_FREEZE_INPUT;
	@@_Count_Pause = COUNT_FREEZE_INPUT;
}

function* <generatorForTask> WaitToReleaseButton()
{
	while (ToArray(@@_Counts()).some(counter => counter != 0))
	{
		yield 1;
	}
}
