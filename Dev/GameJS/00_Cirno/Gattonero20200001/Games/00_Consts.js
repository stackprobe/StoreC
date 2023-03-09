/*
	�萔
*/

/*
	�}�b�v�T�C�Y (�c�E���}�b�v�Z����)
*/
var<int> MAP_W_MIN = 25;
var<int> MAP_H_MIN = 19;

/*
	�}�b�v�Z���E�T�C�Y (�h�b�g�P�ʁE��ʏ�̃T�C�Y)
*/
var<int> TILE_W = 32;
var<int> TILE_H = 32;

// ----
// �v���C���[��񂱂�����
// ----

var<int> PLAYER_HP_MAX = 10;

var<int> PLAYER_DAMAGE_FRAME_MAX = 20;
var<int> PLAYER_INVINCIBLE_FRAME_MAX = 60;

/*
	�W�����v�񐔂̏��
	1 == �ʏ�
	2 == 2-�i�W�����v�܂ŉ\
	3 == 3-�i�W�����v�܂ŉ\
	...
*/
var<int> PLAYER_JUMP_MAX = 2;

/*
	�v���C���[�L�����N�^�̏d�͉����x
*/
var<double> PLAYER_GRAVITY = 0.5;

/*
	�v���C���[�L�����N�^�̗����ō����x
*/
var<double> PLAYER_FALL_SPEED_MAX = 10.0;

/*
	�v���C���[�L�����N�^��(���ړ�)���x
*/
var<double> PLAYER_SPEED = 4.0;

/*
	�v���C���[�L�����N�^�̒ᑬ�ړ�����(���ړ�)���x
*/
var<double> PLAYER_SLOW_SPEED = 2.0;

/*
	�v���C���[�L�����N�^�̃W�����v�ɂ��㏸���x
*/
var<double> PLAYER_JUMP_SPEED = -11.0;

// �؋󒆂ɕǂɓːi���Ă��A�]�V����E�ڒn����Ɉ����|����Ȃ��悤�ɑ��ʔ�����ɍs���B
// -- ( �]�V����Pt_X < ���ʔ���Pt_X && �ڒn����Pt_X < ���ʔ���Pt_X ) ���ێ����邱�ƁB
// �㏸����������ƁA�]�V�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( -(PLAYER_JUMP_SPEED) < �]�V����Pt_Y - ���ʔ���Pt_YT ) ���ێ����邱�ƁB
// ���~����������ƁA�ڒn�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( PLAYER_FALL_SPEED_MAX < �ڒn����Pt_Y - ���ʔ���Pt_YB ) ���ێ����邱�ƁB

var<double> PLAYER_���ʔ���Pt_X = 11.0;
var<double> PLAYER_���ʔ���Pt_YT = 4.0;
var<double> PLAYER_���ʔ���Pt_YB = 19.0;
var<double> PLAYER_�]�V����Pt_X = 10.0;
var<double> PLAYER_�]�V����Pt_Y = 16.0;
var<double> PLAYER_�ڒn����Pt_X = 10.0;
var<double> PLAYER_�ڒn����Pt_Y = 30.0;

// ----
// �v���C���[��񂱂��܂�
// ----

/// GameEndReason_e
//
var<int> GameEndReason_e_STAGE_CLEAR = @(AUTO);
var<int> GameEndReason_e_RETURN_MENU = @(AUTO);
