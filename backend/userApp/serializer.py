from rest_framework import serializers
from .models import Account,UserTokens,bookInformation,notesInformation,recommendation
from rest_framework.generics import ListAPIView

class bookInformationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = bookInformation

class notesInformationSerializer(serializers.ModelSerializer):
    class Meta:
        fields='__all__'
        model=notesInformation

class accountSerializer(serializers.ModelSerializer):
    bookInformation=serializers.StringRelatedField(many=True,read_only=True)
    notesInformation=serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model=Account
        fields=('id','firstName','lastName','email','phoneNumber','password','confirmPassword','dp','bookInformation','notesInformation')


class tokenSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserTokens
        fields=('id','accessToken','googleID','name','email','imageUrl')

class recommendationSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = recommendation



        