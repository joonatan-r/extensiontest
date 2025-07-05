
#include <stdio.h>
#include <windows.h>
// #include <string.h>

int main(int argc, char **argv)
{

unsigned char readsizebuffer[4];
fread(&readsizebuffer, 4, 1, stdin);

// char sizestr[4] = { '\0', '\0', '\0', '\0' };
// sprintf(&sizestr, "%d", readsizebuffer[0]);
// for (int i = 0; i < 4; i++) {
//     if (sizestr[i] == '\0') {
//         sizestr[i] = 32;
//     }
// }

unsigned char readbuffer[1024];
// only support one byte representable size because lazy
fread(&readbuffer, 1, readsizebuffer[0], stdin);

char xcoords[6];
char ycoords[6];

xcoords[0] = readbuffer[1]; // skip initial quote
xcoords[1] = readbuffer[2];
xcoords[2] = readbuffer[3];
xcoords[3] = readbuffer[4];
xcoords[4] = readbuffer[5];
xcoords[5] = '\0';

ycoords[0] = readbuffer[6];
ycoords[1] = readbuffer[7];
ycoords[2] = readbuffer[8];
ycoords[3] = readbuffer[9];
ycoords[4] = readbuffer[10];
ycoords[5] = '\0';

int x;
int y;
sscanf(xcoords, "%d", &x);
sscanf(ycoords, "%d", &y);

mouse_event(MOUSEEVENTF_MOVE | MOUSEEVENTF_ABSOLUTE, x, y, 0, 0);
Sleep(100);
mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0);
Sleep(100);
mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, 0);
Sleep(1000);

unsigned char buffer[4];
buffer[0] = readsizebuffer[0];
buffer[1] = 0;
buffer[2] = 0;
buffer[3] = 0;
fwrite(&buffer, 4, 1, stdout);

unsigned char sendbuffer[1024];

for (int i = 0; i < readsizebuffer[0]; i++) {
    sendbuffer[i] = readbuffer[i];
}

fwrite(&sendbuffer, 1, readsizebuffer[0], stdout);
fflush(stdout);

for (;;);

return 0;

}
