/*
	�L�[�{�[�h����
*/

// memo:
// �L�[�����������Ă���� keydown �����x���Ăяo�����B
// keypress �̓J�[�\���L�[�Ȃǂ̉������E���Ȃ��B

function <void> @(UNQN)_INIT()
{
	document.addEventListener("keydown", @@_A_KeyDown, false);
	document.addEventListener("keyup",   @@_A_KeyUp,   false);
}

var @@_Status = {};

function <void> @@_A_KeyDown(e)
{
	@@_Status["" + e.keyCode] = true;

	if ((37 <= e.keyCode && e.keyCode <= 40) || e.keyCode == 32) // ? �J�[�\���L�[ || �X�y�[�X�L�[ -> ��ʃX�N���[���j�~�̂��ߓ���L�����Z������B
	{
		e.preventDefault();
	}
}

function <void> @@_A_KeyUp(e)
{
	@@_Status["" + e.keyCode] = false;
}

var @@_Counters = {};

function <void> @(UNQN)_EACH()
{
	for (var key in @@_Counters)
	{
		if (@@_Counters[key] == -1)
		{
			delete @@_Counters[key];
		}
		else
		{
			@@_Counters[key]++;
		}
	}

	for (var key in @@_Status)
	{
		if (@@_Status[key])
		{
			if (!(key in @@_Counters))
			{
				@@_Counters[key] = 1;
			}
		}
		else
		{
			if (key in @@_Counters)
			{
				@@_Counters[key] = -1;
			}
		}
	}

	@@_Status = {};
}

// ������ �{�^���E�L�[������ 1 �}�E�X������ -1 �Ŕ��肷��B

/*
	����̃L�[�̉�����Ԃ𓾂�B

	key: �L�[�R�[�h

	�߂�l�F
		-1  == �L�[�𗣂����B
		0   == �L�[�������Ă��Ȃ��B
		1   == �L�[���������B
		2�` == �L�[�����������Ă���B
*/
function <int> GetKeyInput(<int> keyCode)
{
	var ret;
	var key = "" + keyCode;

	if (key in @@_Counters)
	{
		ret = @@_Counters[key];
	}
	else
	{
		ret = 0;
	}
	return ret;
}

/*
	�S�ẴL�[�̉�����Ԃ𓾂�B

	�߂�l�F�A�z�z��
		�L�[�F�L�[�R�[�h�̕�����\��(10�i��)
		�l�F
			-1  == �L�[�𗣂����B
			1   == �L�[���������B
			2�` == �L�[�����������Ă���B

			�������Ă��Ȃ��L�[�͘A�z�z��Ɋ܂܂Ȃ��̂Œl�� 0 ���Ƃ邱�Ƃ͂Ȃ��B
*/
function <map> GetAllKeyInput()
{
	return @@_Counters;
}
