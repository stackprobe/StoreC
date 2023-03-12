/*
	�Q�[���p���C�����W���[��
*/

// *_INIT �C�x���g�̃��X�g
var<Action[]> @@_INIT_Events = [ @(INIT) ];

// *_EACH �C�x���g�̃��X�g
var<Action[]> @@_EACH_Events = [ @(EACH) ];

// �A�v���P�[�V�������̏���
// �W�F�l���[�^�ł��邱�ƁB
var<generatorForTask> @@_AppMain;

// �`���Canvas�^�O
var Canvas;

// �`���Canvas���i�[����Div�^�O
var CanvasBox;

// �Q�[���p���C��
// appMain: �A�v���P�[�V�������̏���
// -- �W�F�l���[�^�ł��邱�ƁB
function <void> ProcMain(<generatorForTask> appMain)
{
	@@_AppMain = appMain;

	/*
	memo:
		Canvas.width, Canvas.height == �X�N���[���E�T�C�Y
		Canvas.style.width, Canvas.style.height == �\����̃T�C�Y
	*/

	Canvas = document.createElement("canvas");
	Canvas.width  = Screen_W;
	Canvas.height = Screen_H;
	Canvas.style.width  = "calc(min(" + Canvas_W + "px, 100%))";
//	Canvas.style.height = Canvas_H + "px";
	Canvas.style.height = "";

	CanvasBox = document.getElementById("Gattonero20200001-CanvasBox");
	CanvasBox.style.width  = "calc(min(" + Canvas_W + "px, 100%))";
//	CanvasBox.style.height = Canvas_H + "px";
	CanvasBox.style.height = "";
	CanvasBox.innerHTML = "";
	CanvasBox.appendChild(Canvas);

	for (var<Action> event of @@_INIT_Events)
	{
		LOGPOS();
		event();
		LOGPOS();
	}

	LoadLocalStorage();
	@@_Anime();
}

// ���t���b�V�����[�g���߂����m�p����
var<int> @@_HzChaserTime = 0;

// �v���Z�X�t���[���J�E���^
var<int> ProcFrame = 0;

// �`���R���e�L�X�g(�`���X�N���[��)
var Context = null;

function <void> @@_Anime()
{
	var<int> currTime = new Date().getTime();

	@@_HzChaserTime = Math.max(@@_HzChaserTime, currTime - 100);
	@@_HzChaserTime = Math.min(@@_HzChaserTime, currTime + 100);

	if (@@_HzChaserTime < currTime)
	{
		Context = Canvas.getContext("2d");
		@@_AppMain.next();

		for (var<Action> event of @@_EACH_Events)
		{
			event();
		}

		Context = null;
		@@_HzChaserTime += 16;
		ProcFrame++;
	}
	else
	{
		LOGPOS();
	}
	requestAnimationFrame(@@_Anime);
}
