class convidado:
    def __init__ (self, id_convidado, nome_convidado, numero_telefone):
        self.id_convidado = id_convidado
        self.nome_convidado = nome_convidado
        self.numero_telefone = numero_telefone

    def to_dict(self):
        return self.__dict__