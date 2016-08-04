
#GUI

from tkinter import *

import tkinter.messagebox

root= Tk()


label= Label(root, relief=SUNKEN, anchor=W)
label.pack(fill=X,side=BOTTOM)

def p1():
    label.config(text='HelloO!')

def p2():
    label.config(text='Compiling...')

def p3():
    label.config(text='Refactoring...')

def rClick(event):
    contextMenu.post(event.x_root, event.y_root)

def close():
    label.config(text='Closing Confirmation...')
    ans=tkinter.messagebox.askquestion('Closing confirmation','Do you really wanna close?')
    if ans == 'yes':
        quit()


menu = Menu(root)
root.config(menu=menu)
root.bind("<Button-3>",rClick)

subMenu= Menu(menu)

menu.add_cascade(label="file", menu=subMenu)
subMenu.add_command(label="Project", command=p1)
subMenu.add_command(label="Compile", command=p2)
subMenu.add_separator()
subMenu.add_cascade(label="exit!", command=quit)


editMenu= Menu(menu)
menu.add_cascade(label="edit", menu=editMenu)
editMenu.add_command(label="refactor", command=p3)

contextMenu = Menu(root, tearoff=0)
contextMenu.add_command(label="Say Hi!", command=p1)
contextMenu.add_command(label="Quit", command=close)

toolBar= Frame(root,bg='orange')
toolBar.pack(side=TOP,fill=X)

openBtn= Button(toolBar, text="Open File", command=p1)
openBtn.pack(side=LEFT, padx=3, pady=4)
closeBtn= Button(toolBar, text="Close File", command=close)
closeBtn.pack(side=RIGHT, padx=3, pady=4)

settingsBtn= Button(toolBar, text="Settings", command=p1)
settingsBtn.pack(side=LEFT, padx=3, pady=4)



root.mainloop()
#Parth Sharma
