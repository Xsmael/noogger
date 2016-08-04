#GUI

from tkinter import *

root= Tk()
'''
myLabel= Label(root,text="Hey python")
myLabel.pack()
'''

'''
topFrame= Frame(root)
topFrame.pack()
botFrame= Frame(root)
botFrame.pack(side=BOTTOM)

button1=Button(topFrame,text="button1",fg='red',bg='pink',)
button2=Button(topFrame,text="button2",fg='magenta')
button3=Button(topFrame,text="button3",fg='blue')
button4=Button(topFrame,text="button4",fg='black')

button1.pack(side=LEFT)
button2.pack(side=LEFT)
button3.pack(side=LEFT)
button4.pack(side=BOTTOM)
'''

'''
label1= Label(root,text="FIRST", fg='red',bg='pink')
label1.pack(fill=X)

label2= Label(root,text="SECOND", fg='black',bg='yellow')
label2.pack(fill=X)

label3= Label(root,text="THIRD", fg='red',bg='black')
label3.pack(side=LEFT, fill=Y)
'''

'''
label1= Label(root,text="username", fg='black',bg='yellow')
label2= Label(root,text="password", fg='red',bg='pink')

entry1= Entry(root)
entry2= Entry(root)

label1.grid(row=0, sticky=W)
label2.grid(row=1, sticky=W)

entry1.grid(row=0, column=1)
entry2.grid(row=1, column=1)
a = Checkbutton(root,text="keep me logged in")
a.grid(columnspan=2)
'''

'''

def PrintName():
    print("hey my name is Ismael")


def PrintAge():
    print("hey my name is 20")


label= Label(root,text="Result= ")
label.grid(row=2,column=1)

def add():
    total= int(entry1.get()) + int(entry2.get())
    label.config(text="answer = %s" % total)

button3=Button(root,text="result",fg='black',bg='yellow', command=add)

entry1= Entry(root)
entry2= Entry(root)


entry1.grid(row=0)
entry2.grid(row=1)
button3.grid(row=2)

'''



def hello():
    label.config(text='HelloO!')

def rClick(event):
    menu.post(event.x_root, event.y_root)

def lClick(event):
    print("Left")

def mClick(event):
    print("Middle")

menu = Menu(root, tearoff=0)
menu.add_command(label="Say Hi!", command=hello)
menu.add_command(label="Quit", command=quit)

label= Label(root)
label.pack()

frame= Frame(root,width=300,height=260)
frame.bind("<Button-1>",lClick)
frame.bind("<Button-2>",mClick)
frame.bind("<Button-3>",rClick)
frame.pack()

root.mainloop()
