from django.contrib import admin
from django.urls import path, re_path
from userApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/userAccount/$', views.create_and_show_account),
    re_path(r'^rest-auth/google/$', views.google_login),
    re_path(r'^rest-auth/userdetail/(?P<id>\w+)/$', views.user_data),
    re_path(r'^rest-auth/updateUser/(?P<id>\w+)/$', views.update_data),
    re_path(r'^rest-auth/bookInfo/(?P<id>\w+)/$', views.book_information_save),
    re_path(r'^rest-auth/bookAdded/(?P<id>\w+)/$', views.list_of_added_books),
    re_path(r'^rest-auth/listOfAddedTextBook/(?P<id>\w+)/$', views.list_of_added_text_books),
    re_path(r'^rest-auth/notesInfo/(?P<id>\w+)/$', views.notes_information_save),
    re_path(r'^rest-auth/notesAdded/(?P<id>\w+)/$', views.list_of_added_notes),
    re_path(r'^rest-auth/specificBookInfo/(?P<id>\w+)/(?P<bookId>\w+)/$', views.specific_book_info),
    re_path(r'^rest-auth/editDataOfBook/(?P<id>\w+)/(?P<bookId>\w+)/$', views.edit_data_of_book),
    re_path(r'^rest-auth/deleteDataOfBook/(?P<id>\w+)/(?P<bookId>\w+)/$', views.delete_data_of_book),
    re_path(r'^rest-auth/specificNoteInfo/(?P<id>\w+)/(?P<noteId>\w+)/$', views.specific_note_info),
    re_path(r'^rest-auth/editDataOfNote/(?P<id>\w+)/(?P<noteId>\w+)/$', views.edit_data_of_note),
    re_path(r'^rest-auth/deleteDataOfNote/(?P<id>\w+)/(?P<noteId>\w+)/$', views.delete_data_of_note),
    re_path(r'^rest-auth/listOfAllAddedBook/$', views.list_of_all_added_books),
    re_path(r'^rest-auth/listOfSelectedBook/(?P<book>\w+)/$', views.list_of_selected_books),
    re_path(r'^rest-auth/getBook/(?P<bookID>\w+)/$', views.get_book),
    re_path(r'^rest-auth/listOfAllAddedTextBook/$', views.list_of_all_added_text_books),
    re_path(r'^rest-auth/listOfSelectedTextBook/(?P<book>\w+)/$', views.list_of_selected_text_books),
    re_path(r'^rest-auth/listOfAllAddedNotes/$', views.list_of_all_added_notes),
    re_path(r'^rest-auth/listOfAddedNotes/(?P<id>\w+)/$', views.list_of_added_notes),
    re_path(r'^rest-auth/listOfAllSelectedNotes/(?P<id>\w+)/(?P<book>[\w\s]+)/$', views.list_of_added_notes_by_book),
    re_path(r'^rest-auth/getNote/(?P<noteID>\w+)/$', views.get_note),
    re_path(r'^rest-auth/recommendationOfBook/$', views.recommendation_save),
    re_path(r'^rest-auth/recommendationOfBookGET/(?P<id>\w+)/$', views.get_recommendation),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    


