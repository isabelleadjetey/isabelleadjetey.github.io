età = int(input("Inserisci la tua età: "))
if età >= 18:
    print("Sei maggiorenne")
else:
    print("Sei minorenne") 


lingue = {"Francese", "Inglese", "Spagnolo"} 
for i, l in enumerate(lingue, 1):
    print(i, l)


count = 0
while count<3:
    print(count, count)
    count += 1 