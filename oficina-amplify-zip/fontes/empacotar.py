"""Empacota os arquivos existentes depois de gerar e validar o material."""
from pathlib import Path
import hashlib, zipfile
base=Path(__file__).resolve().parents[1]
files=sorted(p for p in base.rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.name!='SHA256SUMS.txt')
(base/'SHA256SUMS.txt').write_text('\n'.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+str(p.relative_to(base)) for p in files)+'\n')
files.append(base/'SHA256SUMS.txt')
for name, student in [('OFICINA-AMPLIFY-COMPLETA.zip',False),('MATERIAL-ALUNO-AMPLIFY.zip',True)]:
    with zipfile.ZipFile(base.parent/name,'w',zipfile.ZIP_DEFLATED) as z:
        for p in files:
            relative=p.relative_to(base)
            if student and relative.parts[0] in ['professor','fontes']: continue
            if student and relative.name=='SHA256SUMS.txt': continue
            if student and relative.name in ['LEIA-ME.md','LEIA-ME.html','VALIDACAO.md']: continue
            z.write(p, relative if student else Path(base.name)/relative)
        if student:
            z.writestr('LEIA-ME.txt', 'MATERIAL DO ALUNO — AWS AMPLIFY COM ZIP\n\nExtraia o pacote e abra ABRIR-OFICINA.html no navegador. A oficina e o editor funcionam offline. A publicação na AWS exige internet e acesso preparado.\n\nLeia aluno/GUIA-RAPIDO.pdf. Para a primeira publicação, envie aluno/pacotes/laboratorio-v1.zip ao Amplify, não este ZIP de distribuição. As regras JSON são aplicadas no console.\n\nNo editor, baixe seu perfil personalizado e salve também o backup editável. A oficina incorpora os materiais usados nas missões. O roteiro e as soluções do professor ficam no pacote completo.\n')
    with zipfile.ZipFile(base.parent/name) as z:
        assert z.testzip() is None
        print(name, len(z.namelist()), 'arquivos;', (base.parent/name).stat().st_size,'bytes; integridade OK')
