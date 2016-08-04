#even numbers, break at 237

numbers=[386,462,47,418,907,344,236,375,219,918,238,527]

for x in numbers:
    if x%2==0:
        print(x,'\n')
    if x==237:
        break
