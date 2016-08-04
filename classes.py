from tkinter import *

class myClass:

    def hello(self):
        self.label.config(text='HelloO!')

    def __init__(self,master): # this function is always called when object is instantiated
        frame=Frame(master)
        frame.pack()

        self.printBtn = Button(frame, text='click', command=self.hello)
        self.printBtn.pack()
        self.quitBtn = Button(frame, text='quit', command=frame.quit)
        self.quitBtn.pack()
        self.label = Label(frame)
        self.label.pack()


root= Tk()
c= myClass(root)

root.mainloop()
