const GenericModal = {
    create(title, content, footer) {

        var modal = document.querySelector('#myModal');
        if (modal !== null) {
            // remove caso ja exista
            GenericModal.close();
        }
        modal = '<div id="myModal" class="modal fade" role="dialog">';
        modal += '  <div class="modal-dialog">';

        modal += '      <!-- Modal content-->';
        modal += '      <div class="modal-content">';
        modal += '          <div class="modal-header">';
        modal += '              <button type="button" class="close" data-dismiss="modal">&times;</button>';
        modal += '              <h4 class="modal-title"> ' + title + ' </h4>';
        modal += '          </div>';
        modal += '          <div class="modal-body">';
        modal += content;
        modal += '          </div>';
        modal += '<div class="modal-footer">';
        modal += footer
        modal += '</div>';
        modal += '</div>';

        modal += '</div>';
        modal += '</div>';

        var div = document.createElement('div');
        div.innerHTML = modal;
        modal = div.firstChild;

        document.body.appendChild(modal);
        
        setTimeout(function() {
            $("#myModal").modal();
        }, 200);
    },
    close() {
        $('#myModal').remove();
        $('#myModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
}