/*
	�}�`�E������`��
*/

/*
	�F���Z�b�g����B
	color: ex. "#ff0044", "red"
		�A���t�@�l���� -> "#ff004480" -- R G B A �̏�
*/
function <void> SetColor(<string> color)
{
	Context.fillStyle = color;
}

/*
	��`��`�悷��B
	(l, t, w, h): ������W, ��, ����
*/
function <void> PrintRect(<double> l, <double> t, <double> w, <double> h)
{
	if (w < MICRO || h < MICRO) // ? ����������̂ŕ`��s�v
	{
		return;
	}

	Context.fillRect(l, t, w, h);
}

/*
	��`��`�悷��B
	(l, t, r, b): ������W, �E�����W
*/
function <void> PrintRect_LTRB(<double> l, <double> t, <double> r, <double> b)
{
	PrintRect(l, t, r - l, b - t);
}

/*
	��`��`�悷��B
	(x, y, w, h): ���S���W, ��, ����
*/
function <void> PrintRect_XYWH(<double> x, <double> y, <double> w, <double> h)
{
	PrintRect(x - w / 2, y - h / 2, w, h);
}

/*
	�~��`�悷��B
	(x, y, r): ���S���W, ���a
*/
function <void> PrintCircle(<double> x, <double> y, <double> r)
{
	if (r < MICRO) // ? ����������̂ŕ`��s�v
	{
		return;
	}

	Context.beginPath();
	Context.arc(x, y, r, 0, Math.PI * 2.0, false);
	Context.fill();
}

/*
	�t�H���g���Z�b�g����B
	font: ex. "16px 'sans-serif'"
*/
function <void> SetFont(<string> font)
{
	Context.font = font;
}

/*
	�t�H���g�T�C�Y���Z�b�g����B
	size: ex. 16
*/
function <void> SetFSize(<int> size)
{
	SetFont(size + "px 'sans-serif'");
}

var<int> @@_X = 0;
var<int> @@_Y = 0;
var<int> @@_YStep = 0;

/*
	������`��ʒu���Z�b�g����B
	x: ������̍��� X-���W
	y: ������̉��� Y-���W
	yStep: ���s�X�e�b�v Y-�� (���s���Ȃ��ꍇ�� 0 ���w�肷�邱��)
*/
function <void> SetPrint(<int> x, <int> y, <int> yStep)
{
	@@_X = x;
	@@_Y = y;
	@@_YStep = yStep;
}

/*
	�������`�悷��B
	line: ������
*/
function <void> PrintLine(<string> line)
{
	Context.fillText(line, @@_X, @@_Y);
	@@_Y += @@_YStep;
}

/*
	�������`�悵���Ƃ��̕����擾����B
	line: ������
	ret: ������̕�
*/
function <double> GetPrintLineWidth(<string> line)
{
	return Context.measureText(line).width;
}
