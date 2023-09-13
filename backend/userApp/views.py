from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Account, UserTokens, bookInformation, notesInformation,recommendation

from userApp.serializer import accountSerializer
from userApp.serializer import bookInformationSerializer
from userApp.serializer import tokenSerializer
from userApp.serializer import recommendationSerializer
from userApp.serializer import notesInformationSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from django.utils.translation import ugettext_lazy as _



@api_view(['GET', 'POST'])
def create_and_show_account(request):
    if request.method == "GET":
        data = Account.objects.all()
        serializer = accountSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = accountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def google_login(request):
    if request.method == "GET":
        data = UserTokens.objects.all()
        serializer = tokenSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = tokenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_data(request, id):
    data = Account.objects.get(id=id)
    serializer = accountSerializer(data, context={'request': request})
    return Response(serializer.data)


@api_view(['PUT'])
def update_data(request, id):
    datas = Account.objects.get(id=id)
    serializer = accountSerializer(datas, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def book_information_save(request, id):
    user = Account.objects.get(id=id)
    serializer = bookInformationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_of_added_books(request, id):
    user = Account.objects.get(id=id)
    data = bookInformation.objects.filter(user=user, status='addedOnList', book="Book")
    serializers = bookInformationSerializer(data, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def list_of_added_text_books(request, id):
    user = Account.objects.get(id=id)
    data = bookInformation.objects.filter(user=user, status='addedOnList', book="TextBook")
    serializers = bookInformationSerializer(data, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['POST'])
def notes_information_save(request, id):
    user = Account.objects.get(id=id)
    serializer = notesInformationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_of_added_notes(request, id):
    user = Account.objects.get(id=id)
    data = notesInformation.objects.filter(user=user, status='addedOnList')
    serializers =notesInformationSerializer(data, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def specific_book_info(request, id, bookId):
    user = Account.objects.get(id=id)
    bookData = bookInformation.objects.get(user=user, id=bookId)
    serializers = bookInformationSerializer(bookData, context={'request': request})
    return Response(serializers.data)


@api_view(['PUT'])
def edit_data_of_book(request, id, bookId):
    user = Account.objects.get(id=id)
    bookInfo = bookInformation.objects.get(user=user, id=bookId)
    serializers = bookInformationSerializer(bookInfo, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(serializers.errors)


@api_view(['DELETE'])
def delete_data_of_book(request, id, bookId):
    user = Account.objects.get(id=id)
    bookInfo = bookInformation.objects.get(user=user, id=bookId)
    bookInfo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def specific_note_info(request, id, noteId):
    user = Account.objects.get(id=id)
    noteData = notesInformation.objects.get(user=user, id=noteId)
    serializers = notesInformationSerializer(noteData, context={'request': request})
    return Response(serializers.data)


@api_view(['PUT'])
def edit_data_of_note(request, id, noteId):
    user = Account.objects.get(id=id)
    noteInfo = notesInformation.objects.get(user=user, id=noteId)
    serializers = notesInformationSerializer(noteInfo, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(serializers.errors)


@api_view(['DELETE'])
def delete_data_of_note(request, id, noteId):
    user = Account.objects.get(id=id)
    noteData = notesInformation.objects.get(user=user, id=noteId)
    noteData.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def list_of_all_added_books(request):
    addedBooks = bookInformation.objects.filter(status='addedOnList', book="Book")
    serializers = bookInformationSerializer(addedBooks, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def list_of_selected_books(request, book):
    addedBooks = bookInformation.objects.filter(status='addedOnList', book="Book", typeOfBook=book)
    serializers = bookInformationSerializer(addedBooks, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def get_book(request, bookID):
    bookInfo = bookInformation.objects.filter(id=bookID)
    serializers = bookInformationSerializer(bookInfo, context={'request': request}, many=True)
    return Response(serializers.data)

@api_view(['GET'])
def get_note(request, bookID):
    bookInfo = notesInformation.objects.filter(id=bookID)
    serializers = notesInformationSerializer(bookInfo, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def list_of_all_added_text_books(request):
    addedBooks = bookInformation.objects.filter(status='addedOnList', book="TextBook")
    serializers = bookInformationSerializer(addedBooks, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def list_of_selected_text_books(request, book):
    addedBooks = bookInformation.objects.filter(status='addedOnList', book="TextBook", typeOfBook=book)
    serializers = bookInformationSerializer(addedBooks, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def list_of_all_added_notes(request):
    addedNotes = notesInformation.objects.filter(status='addedOnList')
    serializers = notesInformationSerializer(addedNotes, context={'request': request}, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def list_of_added_notes(request, id):
    user = Account.objects.get(id=id)
    data = notesInformation.objects.filter(user=user, status='addedOnList')
    serializers = notesInformationSerializer(data, context={'request': request}, many=True)
    return Response(serializers.data)



@api_view(['GET'])
def list_of_added_notes_by_book(request, id, book):
    try:
        user = Account.objects.get(id=id)
        data = notesInformation.objects.filter(user=user, status='addedOnList', book=book)
        if data.exists():
            serializers = notesInformationSerializer(data, context={'request': request}, many=True)
            return Response(serializers.data)
        else:
            return Response({'message': 'No notes found for the given book.'}, status=status.HTTP_204_NO_CONTENT)
    except Account.DoesNotExist:
        return Response({'error': 'Invalid Account ID'}, status=status.HTTP_404_NOT_FOUND)





@api_view(['POST'])
def recommendation_save(request, id):
    user = Account.objects.get(id=id)
    serializer = recommendationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_recommendation(request, id):
    try:
        user = Account.objects.get(id=id)
        data = recommendation.objects.filter(user=user)
        serializers = recommendationSerializer(data, context={'request': request}, many=True)
        return Response(serializers.data)
    except Account.DoesNotExist:
        return Response({'error': 'Invalid Account ID'}, status=status.HTTP_404_NOT_FOUND)



class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


@api_view(['GET'])
def get_textbooks_by_subject(request, subject):
    textbooks = bookInformation.objects.filter(book="TextBook", subject=subject)
    serializers = bookInformationSerializer(textbooks, context={'request': request}, many=True)
    return Response(serializers.data)
