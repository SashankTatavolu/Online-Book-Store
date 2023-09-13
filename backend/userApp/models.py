from django.db import models
import jsonfield
from datetime import date




class Account(models.Model):
    firstName=models.CharField("First Name",max_length=1000)
    lastName=models.CharField("Last Name",max_length=1000)
    email=models.EmailField("Email",max_length=1000)
    phoneNumber=models.CharField("phoneNumber",max_length=1000)
    password=models.CharField("password",max_length=2000)
    confirmPassword=models.CharField("repassword",max_length=2000)
    dp=models.ImageField("dp",upload_to='media/images',blank=True,default='media/images/pp.jpg',null=True)

class UserTokens(models.Model):
    accessToken=models.CharField("Access Token",max_length=20000)
    googleID=models.CharField("Google Id ",max_length=20000)
    name=models.CharField("Name",max_length=20000)
    email=models.EmailField("Email",max_length=20000)
    imageUrl=models.CharField("Image",max_length=20000)

class bookInformation(models.Model):
    user=models.ForeignKey(Account,related_name='bookInformation',on_delete=models.CASCADE,null=True)
    status=models.CharField(default='addedOnList',max_length=10000)
    book=models.CharField("Book",max_length=200)
    typeOfBook=models.CharField("typeOfBook",max_length=2000)
    nameOfWriter=models.CharField("nameOfWriter",max_length=5000)
    labelPriceBook=models.IntegerField("labelPriceBookk")
    bookImage=models.ImageField("bookImage",upload_to='media/images',blank=True,null=True)
    nameOfBook=models.CharField("nameOfBook",max_length=10000)
    dateOfPublication=models.DateField("dateOfPublication",null=True)
    conditionBook=models.CharField("conditionBook",max_length=20000)
    date=models.DateField(default=date.today)



class notesInformation(models.Model):
    user = models.ForeignKey(Account, related_name='notesInformation', on_delete=models.CASCADE, null=True)
    status = models.CharField(default='addedOnList', max_length=10000)
    notesType = models.CharField("notesType", max_length=10000)
    noteTitle = models.CharField("noteTitle", max_length=10000)
    notePrice = models.IntegerField("notePrice")
    noteFaculty = models.CharField("noteFaculty", max_length=50000)
    noteExplanation = models.CharField("noteExplanation", max_length=10000)
    book = models.CharField("book", max_length=200) 
    date = models.DateField(default=date.today)


class recommendation(models.Model):
    name=models.CharField("userName",max_length=2000,null=True)
    bookName=models.CharField("bookName",max_length=2000,null=True)
    nameOfWriterRecommendation=models.CharField("nameOfWriterRecommendation",max_length=5000,null=True)
    review=models.TextField("review",max_length=10000,null=True)
    dateOFRecommendation=models.DateField(default=date.today)

    


    




